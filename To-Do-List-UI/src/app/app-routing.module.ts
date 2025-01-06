import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
   {path:'taskform',component:TaskListComponent,canActivate: [AuthGuard]},
  { path: 'add-task', component: TaskFormComponent,canActivate: [AuthGuard] }, 
  { path: 'edit-task/:id', component: TaskFormComponent,canActivate: [AuthGuard] },
  {path:'register',component:RegisterComponentComponent},
  {
    path:'login',component:LoginComponentComponent
  },
  {
    path:'home',component:HomeComponent
  }
 ,
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
