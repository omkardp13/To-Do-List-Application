import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
   {path:'taskform',component:TaskListComponent},
  { path: 'add-task', component: TaskFormComponent }, 
  { path: 'edit-task/:id', component: TaskFormComponent },
  {path:'register',component:RegisterComponentComponent},
  {
    path:'login',component:LoginComponentComponent
  },
  {
    path:'home',component:HomeComponent
  }
 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
