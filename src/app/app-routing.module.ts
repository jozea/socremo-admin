import { AuthenticationGuard } from './guard/authentication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';


const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('../app/pages/auth/auth.module')
  .then(m => m.AuthModule),
},
{
  path: "register",
  component: RegisterComponent,
  // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['dashboard'] }
},
{
  path: 'app',
  loadChildren: () => import('../app/pages/secure/secure.module')
  .then(m => m.SecureModule),
  // canActivate: [AuthenticationGuard]
},
{ path: '', redirectTo: 'auth', pathMatch: 'full' },
{ path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
