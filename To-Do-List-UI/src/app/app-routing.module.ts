import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
   // Default route shows task list
   {path:'taskform',component:TaskListComponent},
  { path: 'add-task', component: TaskFormComponent }, // Route to add task form
  { path: 'edit-task/:id', component: TaskFormComponent },
   // Route to edit task
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
