import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './reg-form/reg-form.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: 'reg-form', component: RegistrationFormComponent},
  { path: 'profile-page', component: ProfilePageComponent, canActivate: [() => inject(AuthGuard).canActivate()], },
  { path: '**', redirectTo: 'reg-form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
