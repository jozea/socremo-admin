import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
// export const AuthRoutes = RouterModule.forChild(routes);