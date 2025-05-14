import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'add-user' }, 
  { path: 'users-list', component: UsersListComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'edit-user/:id', component: UserDetailComponent },
  { path: 'user/:id', component: UserDetailComponent },
    { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'users', component: UsersListComponent },
  // { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
