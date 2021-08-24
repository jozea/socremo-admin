import { PermissionService } from 'src/app/services/permission/permission.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  roleName: string = ""
  checkedRole: string = ''
  buttonClicked: string = ""

  roles = []
  availableRoles
  selectedUserId: string = ""
  isAssign: boolean = false

  searchingUser: boolean = false
  searchUserMessage = ""
  selectedUserMobileNumber = ""

  loggedInUserMobileNumber=""


  constructor(
    private permissionService: PermissionService,
    private utilService: UtilsService,
    private router: Router,
    
    ) {

  }

  onPageToggle(event) {
    if(event.checked == true){
      this.router.navigate(["app/setting/admin-user"])
    }
  }

  ngOnInit() {
    this.fetchRoles()
    this.initForm()
    this.getPermission()

    this.loggedInUserMobileNumber = JSON.parse(sessionStorage.getItem('user')).mobileNumber;
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

  changeRole(role) {
    this.isAssign = true
    this.buttonClicked = "";
    for (let selectedRole of this.availableRoles) {
      if (selectedRole.name === role) {
        selectedRole.isSelected = true;
        this.permissions = selectedRole.permissions;
        this.roleName = role;
      } else {
        selectedRole.isSelected = false;
      }
    }
  }

  id: string
  selectedRole() {
    this.permissions = this.roleForm.value.selectedRole.permissions
    this.roleName = this.roleForm.value.selectedRole.role
    this.id = this.roleForm.value.selectedRole._id
  }

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
  }


  handleButtonClicked(buttonName) {
    if (buttonName === 'create') {
      this.permissions = this.allPermissions
    }
    this.roleForm.controls.selectedRole.setValue(null);
    this.roleName = ''
    this.buttonClicked = buttonName;
    this.isAssign = false
  }

  selectCheck(action, event) {
    if (action !== 'all') {
      for (let perm of this.permissions) {
        if (perm.action === action) {
          perm.isPermitted = event.checked;
        }
      }
    } else {
      for (let perm of this.permissions) {
        perm.isPermitted = !this.isAll;
      }
      this.isAll = !this.isAll
    }
  }

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

  getRoles(buttonName) {
    this.isAssign = false
    this.permissionService.getAllRoles().subscribe(result => {
      if (result.status === true) {
        this.roles = result.data
        this.buttonClicked = buttonName;
      }
    }, err => {
      this.utilService.triggerNotification(err.message ?? "Could not fetch roles")      
    })
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
}
