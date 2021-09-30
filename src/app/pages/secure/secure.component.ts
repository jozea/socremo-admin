import { Router } from '@angular/router';
import { SidenavService } from './../../services/sidenav/sidenav.service';
import { Component, OnInit, Input } from '@angular/core';
import { onMainContentChange } from '../../utils/animations/animations'
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  animations: [onMainContentChange]

})
export class SecureComponent implements OnInit {
  userName: string = "";
  mobileNumber: string = "";

  public onSideNavChange: boolean;

  @Input() sidenav: MatSidenav

  constructor(
    private _sidenavService: SidenavService,
    private authService: AuthService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private utilService: UtilsService,
    private translate: TranslateService
    ) {
      translate.setDefaultLang('pt'); 
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    })
  }

  useLanguage(language: string): void {
    this.translate.use(language);

  }

  async handleUserLogout() {
    // this.router.navigate(['/login']); 
    this.authService.logOutUser({ mobileNumber: this.mobileNumber }).subscribe(response => {
      this.handleNavigationToAuth()
    }, (err) => {
      this.handleNavigationToAuth()
    })

  }

  handleNavigationToAuth() {
    sessionStorage.clear();
    this.bnIdle.stopTimer();
    this.router.navigate(['/auth']);    
  }


  ngOnInit() {
    if (sessionStorage.user) {
      const user = JSON.parse(sessionStorage.user);
      this.mobileNumber = user.user.mobileNumber;
      this.userName = `${user.user.name}`
      // this.userName = `${user.firstName} ${user.lastName}`
      this.utilService.changeTab("language", "btn", " active-lang")


      this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.utilService.triggerNotification("Session Timeout", 100000)
          this.handleNavigationToAuth()
        }
      });
    }
  }

}
