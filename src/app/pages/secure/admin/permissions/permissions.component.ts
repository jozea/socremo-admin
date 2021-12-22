import { PermissionService } from 'src/app/services/permission/permission.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  userModel: any = {}; 
  permissions = []
  mobile: string = ""
  userNameList = []
  isUsers: boolean = false;
  isAll: boolean = false
  removeUserAssign: string[] = ["create", "delete", "edit"]

  roleForm: FormGroup;
  checkForm: FormGroup
  resourceForm: FormGroup;
  roleName: string = ""
  resourceName: string = ""
  checkedRole: string = ''
  buttonClicked: string = ""

  roles = []
  availableRoles
  selectedUserId: string = ""
  isAssign: boolean = false

  searchingUser: boolean = false
  searchUserMessage = ""
  selectedUserMobileNumber = ""

  loggedInUserMobileNumber="";
  isLoading: boolean = false

  availableResource: any =[]
  checkAll: boolean =false

  newArr=[]
  actions=[]
  permissionsArray=[]
  menuAndPermissions: any;
  allPerm=['create', 'read', 'update', 'delete']
  newMenu: any
  arr=[]
  res=[]
  roleId:any

  roleSelected
  



  constructor(
    private permissionService: PermissionService,
    private utilService: UtilsService,
    private router: Router,
    public fb: FormBuilder
    
    ) {

  }

  onPageToggle(event) {
    if(event.checked == true){
      this.router.navigate(["app/setting/admin-user"])
    }
  }

  ngOnInit() {
    this.checkForm = this.fb.group({
      items: this.fb.array([])
    });
    // this.fetchRoles()
    this.initForm()
    // this.getPermission()
    this.fetchResources()
    this.fetchNewRoles()
    this.fetchAdmins()

    // this.loggedInUserMobileNumber = JSON.parse(sessionStorage.getItem('user')).mobileNumber;
  }
  
  allAdmin: any
  fetchAdmins() {
    this.permissionService.fetchAdmins().subscribe((response: any)=> {
      // console.log(response)
      this.allAdmin = response.data.result
    })
  }
  fetchRoles() {
    this.permissionService.getAllRoles().subscribe(result => {
      if (result.status === true) {
        this.availableRoles = result.data.map(data => {
          data.isSelected = false
          data.name = data.role
          return data
        })
      }
    }, (err) => {
      this.utilService.triggerNotification('Could not fetch roles')
    })
  }


  id: string

  allPermissions = []
  getPermission() {
    this.permissionService.getAllPermissions()
      .subscribe(res => {
        if (res.status === true) {
          this.allPermissions = res.data.permissions
          this.permissions = res.data.permissions;
        } else {
          this.utilService.triggerNotification('Could not fetch permissions. Try again later.')
        }
      }, (err) => {
        this.utilService.triggerNotification('Network Error')
      })
  }

  initForm() {
    this.roleForm = new FormGroup({
      selectedRole: new FormControl()
    })
    this.resourceForm = new FormGroup({
      selectedResource: new FormControl()
    })
  }


  showAdmins = false
  handleButtonClicked(buttonName) {
    this.showAdmins = false
    if (buttonName === 'create') {
      this.permissions = this.allPermissions
      this.fetchResources()
    }
    this.roleForm.controls.selectedRole.setValue(null);
    this.roleName = ''
    this.buttonClicked = buttonName;
    this.isAssign = false
  }

  show: boolean = false
  handleResourceButtonClicked(buttonName) {
    this.showAdmins = false
    if (buttonName === 'createResource') {
      this.show = false
      // this.permissions = this.allPermissions
    }else if (buttonName === 'editResource') {
      this.show = true
      this.availableRoles = []
      this.fetchNewRoles()
      this.fetchResources()
    }
    this.resourceForm.controls.selectedResource.setValue(null);
    // this.roleName = ''
    this.buttonClicked = buttonName;
    // this.isAssign = false
  }

  resourceId: any;
  changeResourceName(resource) {
    for (let selectedtResource of this.availableResource) {
      if (selectedtResource.name === resource) {
        // this.availableResource = [selectedtResource]
        // console.log(this.availableResource)
        this.resourceId = selectedtResource._id
        this.resourceName = selectedtResource.name
      } 
    }
  }

  changeRole(role, buttonName, event) {
    this.buttonClicked = buttonName
    this.loadingState = true
    if (this.buttonClicked == 'edit') {
      this.roleName = role.name
      this.roleId = role._id
      this.fetchResources()
    }else if (this.buttonClicked == 'update') {
      this.roleName = event
      this.fetchResources()
    }
    
  }

  permit: boolean = false
  editPerms = []
  checked: any;
  unCheckAll: boolean = false
  changeRol(role) {
    this.loadingState = false
    for (let selectedRole of this.availableRoles) {
      if (selectedRole.name === role) {
        this.editPerms = selectedRole.resources
        // this.editPerms = this.newRole
        this.resPerm.forEach((a,i)=> {
          this.editPerms.forEach((b)=> {
            if (a.name == b.name) {
              a.checked = true
              a.permissions.forEach((c) => {
                b.permissions.forEach(d => {
                  if (c.name == d.name ) {
                    c.checked = true
                  }
                });
              });
            }
          })
        })
        this.resPerm = this.resPerm.filter(a=> a.checked == true)
      }else {
        this.unCheckAll = true
      }
    }
  }

  updateEvent
  selectedRole(event) {
    this.loadingState = false
    this.availableRoles.forEach(e => {
      if (e.name == event) {
        this.editPerms = e.resources
        // this.editPerms = this.newRole
        this.resPerm.forEach((a,i)=> {
          this.editPerms.forEach((b)=> {
            if (a.name == b.name) {
              a.checked = true
              a.permissions.forEach((c) => {
                b.permissions.forEach(d => {
                  if (c.name == d.name ) {
                    c.checked = true
                  }
                });
              });
            }
          })
        })
      }
    });
  }

  selectedResource(event) {
    this.resourceName = event
    this.availableResource.forEach(e => {
      if(e.name == this.resourceName) {
        this.resourceId = e._id
      }
    });
  }

  selectRole(event) {
    this.roleName = event
    this.availableRoles.forEach(e => {
      if (this.roleName == e.name) {
        this.isActive = e.isActive
        this.roleId = e._id
      }
    });
  }

  adminId: any
  changeAdminName(name) {
    this.allAdmin.forEach(e => {
      if (e.name == name) {
        this.adminId = e._id
      }
    });
  }
  changeRoleAssign(name) {
    this.availableRoles.forEach(e => {
      if (e.name == name) {
        this.roleId = e._id
      }
    });
  }

  menuIndex
  selectMenu(menu, event, index) {
    this.resPerm.forEach((e,i)=> {
      if (e.name == menu ) {
        e.checked = event.checked
        this.menuIndex = index
      }
    })
  }

  arrr=[]
  selectPermission(allPermisions, perm, event, index) {
    allPermisions.forEach(e => {
      if (e.name == perm) {
        e.checked = event.checked
      }
    });
  }
  
  // selectCheck(action, event) {
  //   console.log(event)
  //   if (action !== 'all') {
  //     for (let perm of this.permission) {
  //       // if (perm.action === action) {
  //         perm.isPermitted = event.checked;
  //       // }
  //     }
  //   } else {
  //     for (let perm of this.permission) {
  //       perm.isPermitted = !this.isAll;
  //     }
  //     this.isAll = !this.isAll
  //   }
  // }

  checkValues(button) {
    let checkPermissions = []
    if (this.roleName !== "") {
      checkPermissions = this.permissions.filter(data => data.isPermitted === true)
      if (checkPermissions.length > 0 && button === "create") {
        this.onCreate()
      } else if (checkPermissions.length > 0 && button === "edit") {
        // this.onEdit()
        this.onCreate()
      } else {
        this.utilService.triggerNotification('Roles require at least one permission')
        return;
      }
      this.buttonClicked = ""
      this.permissions = this.allPermissions;
    } else {
      this.utilService.triggerNotification('Please enter a role name')
    }

  }
  loadingState: boolean = false;

  onCreate() {
    this.loadingState = true
    const model = {
      existingAdminMobileNumber: this.loggedInUserMobileNumber,
      permissions: this.permissions,
      role: this.roleName.toLowerCase(),
    }
    this.permissionService.createRole(model)
      .subscribe(async(data) => {
        if (data.status === true) {
         await this.fetchRoles()
          this.loadingState = false;
          this.utilService.triggerNotification('Role created')
          return;
        } 
      this.utilService.triggerNotification('Role creation failed. Try again later')
      }, (error) => {
        this.loadingState = false;
      this.utilService.triggerNotification(error.message ? error.message : 'Network Issues. Try again later',)
      })
  }

  onDelete() {
    this.loadingState = true;

    const model = {
      role: this.roleName,
      existingAdminMobileNumber: this.loggedInUserMobileNumber,
    }

    this.permissionService.deleteRoles(model)
      .subscribe(data => {
        if (data.status === true) {
          this.permissions = []
          this.roleName = ""
          this.id = ""
          this.buttonClicked = ""
          this.permissions = this.allPermissions;
          this.fetchRoles()
        } else {
          this.utilService.triggerNotification('Role removal failed. Try again later')
        }
        this.loadingState = false
      }, err => {
        this.loadingState = false
        this.utilService.triggerNotification('Role delete failed')
      })
  }

  refreshPage() {
    this.buttonClicked = "";
  }

  isActive: any
  getRoles(buttonName) {
    this.showAdmins = false
    this.buttonClicked = buttonName;
    if (this.buttonClicked == 'edit') {
      this.availableRoles = []
      this.fetchNewRoles()
      this.fetchResources()
    }else if (this.buttonClicked == 'update') {
      this.fetchResources()
      this.fetchNewRoles()
    }else if (this.buttonClicked == 'delete') {
      // this.availableRoles.forEach(e => {
      //   if (this.roleName == e.name) {
      //     this.isActive = e.isActive
      //   }
      // });
    }
  }

  selectAdmin() {
    this.showAdmins = true
  }


  getUser() {
    this.searchingUser = true
    let model = { mobileNumber: this.mobile }
    this.permissionService.searchUser(model).subscribe(result => {
      this.searchingUser = false
      if (result.status === true && result.data.length > 0) {
        this.userNameList = result.data
        this.searchUserMessage = "Users fetched"
        this.selectedUserId = this.userNameList[0].mobileNumber
      } else {
        this.searchUserMessage = "User not found"
        this.utilService.triggerNotification("No result found for this search")      
      }
    }, err => {
      this.utilService.triggerNotification("System couldn't fetch users, please try again later")      
    })
  }

  handleUserSelection(mobileNumber) {
    this.selectedUserId = mobileNumber;
  }


  assignRole() {

    if (this.selectedUserId === "") {
      this.utilService.triggerNotification("First select a user")      
      return;
    } else if (this.roleName === "") {
      this.utilService.triggerNotification("First select a role to assign user")      
      return;
    }
    const model = {
      existingAdminMobileNumber: this.loggedInUserMobileNumber,
      mobileNumber: this.selectedUserId,
      role: this.roleName.toLowerCase()
    }
    this.loadingState = true
    this.permissionService.userReg(model).subscribe((data: any) => {
      if (data.status === true) {
        this.utilService.triggerNotification("User Role updated!")      
        this.loadingState = false;
      }
    }, (err) => {
      this.utilService.triggerNotification(err.message ?? "User Role update failed")   
      this.loadingState = false;   
    })

  }

  createResource() {
    let model = {
      name:this.resourceName
    }
    this.isLoading = true
    this.permissionService.createResource(model).subscribe((result: any)=> {
      // console.log(result)
      if(result.status == true) {
        this.utilService.triggerNotification(result.message)
        this.isLoading = false
      }else {
        this.utilService.triggerNotification(result.message)
        this.isLoading = false
      }
    }, error=> {
      this.utilService.triggerNotification(error.message)
      this.isLoading = false
    })
  }

  resPerm=[]
  fetchResources() {
    this.permissionService.getResource().subscribe((result: any)=> {
      // console.log(result)
      if (result.status == true) {
        this.availableResource = result.data
        this.resPerm = this.availableResource.map((e,i) => {
          let d = {
            name: e.name,
            checked: false,
            permissions: [
              { name: 'create', checked: false },
              { name: 'read', checked: false },
              { name: 'update', checked: false },
              { name: 'delete', checked: false }
            ]
          }
          return d
        });
        if (this.buttonClicked == 'edit') {
          this.changeRol(this.roleName )
        }else if (this.buttonClicked == 'update') {
          this.selectedRole(this.roleName)
        }
      }else {
        this.utilService.triggerNotification(result.message)
        this.loadingState = false
      }
    }, error=> {
      this.utilService.triggerNotification(error.message)
      this.loadingState = false
    })

  }

  createNewRole() {
    let checkPermissions=[]
    let checkedPerm=[]
    checkPermissions = this.resPerm.filter(data => data.checked === true)
    checkPermissions.forEach((e,p)=> {
      delete e.checked
      for(var i = 0;i < e.permissions.length; i ++) {
        if(e.permissions[i].checked == false) {
          e.permissions.splice(i, 1);
          i--;  //re-adjust the counter.
        }
        checkedPerm = e.permissions.map(function(item) {
          return item['name'];
        });
      }
      e.permissions = checkedPerm
    })
    let model = {
      name:this.roleName, 
      resources: checkPermissions
    }
    this.loadingState = true

    this.permissionService.createNewRole(model).subscribe((result:any)=> {
      // console.log(result)
      if(result.status == true) {
        this.utilService.triggerNotification(result.message)
        this.loadingState = false
        location.reload()
      }else {
        this.utilService.triggerNotification(result.message)
        this.loadingState = false
        location.reload()
      }
    }, error=> {
      this.utilService.triggerNotification(error.message)
      this.loadingState = false
    })

  }

  fetchNewRoles() {
    this.permissionService.getNewRole().subscribe((result: any)=> {
      // console.log(result)
      if(result.status == true) {
        this.availableRoles = result.data
        // this.utilService.triggerNotification(result.message)
        this.loadingState = false
      }else {
        this.utilService.triggerNotification(result.message)
        this.loadingState = false
      }
    }, error=> {
      this.utilService.triggerNotification(error.message)
      this.loadingState = false
    })
  }

  editResource() {
    let model = {
      resourceId: this.resourceId,
      resourceName: this.resourceName
    }
    this.loadingState = true
    this.permissionService.editResourceName(model.resourceId, model.resourceName).subscribe((result: any)=> {
      if(result.status == true) {
        this.availableRoles = result.data
        this.utilService.triggerNotification(result.message)
        this.loadingState = false
        this.fetchResources()
      }else {
        this.utilService.triggerNotification(result.message)
        this.loadingState = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.loadingState = false
    })
    
  }

  editRoleResourcePerm(value, index, menu) {
    let checkedPerm
    let resourceId
    let editedPermission = menu.permissions.filter(e => e.checked == true);
    checkedPerm = editedPermission.map(function(item) {
      return item['name'];
    });
    this.availableRoles.forEach(e => {
      if (this.roleName == e.name) {
        e.resources.forEach(a => {
          if (menu.name == a.name) {resourceId = a._id}
        });
      }
    });
    let model = {
      roleId: this.roleId,
      resourceId: resourceId,
      permissions: checkedPerm
    }
    // console.log(model)
    this.loadingState = true
    this.permissionService.editRoleResourcePermission(model).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.loadingState = false
      }else {
        this.utilService.triggerNotification(response.message)
        this.loadingState = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.loadingState = false
    })
  }

  updateRolePermission(menu) {
    let checkedPerm
    let editedPermission = menu.permissions.filter(e => e.checked == true);
    checkedPerm = editedPermission.map(function(item) {
      return item['name'];
    });
    this.availableRoles.forEach(e => {
      if (this.roleName == e.name) {
        this.roleId = e._id
      }
    });
    let model = {
      resource:{
        name: menu.name, 
        permissions:checkedPerm
      }
    }
    this.loadingState = true
    this.permissionService.updateRolePermisssion(model, this.roleId).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.loadingState = false
      }else {
        this.utilService.triggerNotification(response.message)
        this.loadingState = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.loadingState = false
    })
  }

  assignUserRole() {
    this.adminId = ''
    this.roleId =''
    this.showAdmins = false
    // this.loadingState = true
    // this.permissionService.assignRole(this.roleId,this.adminId).subscribe((response: any)=> {
    //   if (response.status == true) {
    //     this.utilService.triggerNotification(response.message)
    //     this.loadingState = false
    //     this.adminId = ''
    //     this.roleId =''
    //   }
    // }, error=> {
    //   this.utilService.triggerNotification(error.message) 
    //   this.loadingState = false
    // })
  }

  deleteResource() {
    // console.log(this.resourceId)
    this.isLoading = true
    this.permissionService.disableAndEnableResource(this.resourceId).subscribe((response: any)=> {
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoading = false
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoading = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.loadingState = false
    })
  }

  deleteRole(){
    let state
    if (this.isActive) {
      state = true
    }else if (!this.isActive) {
      state = false
    }
    this.loadingState = true
    this.permissionService.disableAndRestoreRole(state, this.roleId).subscribe((response: any)=> {
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.loadingState = false
      }
    }, error=> {
      this.utilService.triggerNotification(error.message)
      this.loadingState = false
    })
  }

  submitResource(buttonName) {
    if (buttonName === 'createResource') {
      this.createResource()
    }else if (buttonName === 'editResource') {
      this.editResource()
    }
  }

}
