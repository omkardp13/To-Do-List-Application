import { Component, OnInit } from '@angular/core';
import { Task } from 'src/Task'; 
import { TaskService } from '../task-service.service';  
import { UserAccountService } from '../user-account.service';
import { User } from 'src/User';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  currentUser: User|null=null;
   
  tasks: Task[] = [];  
  showTaskForm: boolean = false;  
  selectedTask: Task = {
    taskId: 0,
    userId: 0,
    title: '',
    description: '',
    isCompleted: false,
    createdAt: new Date()
  };

  constructor(private taskService: TaskService,private userAccount:UserAccountService,public userService:UserAccountService)
   {
    this.userAccount.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.showTaskForm = false;
    
  }

  loadTasks(): void {
  
    if (this.currentUser?.userId) {  
      this.taskService.getTasks(this.currentUser.userId).subscribe((tasks) => {
        this.tasks = tasks;
      
      });
    } 
  }
  
  addNewTask(): void {
    this.selectedTask = {
      taskId: 0,
      userId: 0,
      title: '',
      description: '',
      isCompleted: false,
      createdAt: new Date()
    };
    this.showTaskForm = true; 
  }

  deleteTask(taskId: number): void {
  
    this.taskService.deleteTask(taskId).subscribe(
      () => {
       
        this.tasks = this.tasks.filter(task => task.taskId !== taskId);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
  
 
  editTask(task: Task): void {
    this.selectedTask = { ...task };  
    this.showTaskForm = true;  
  }

 
  onSaveTask(task: Task): void {
    
    if (this.currentUser?.userId) {  
      task.userId = this.currentUser.userId;     
    } 
    
    if(task.taskId!=0)
    {
      this.taskService.updateTask(task.taskId, task).subscribe({
        next: (updatedTask) => {
          
          const index = this.tasks.findIndex(t => t.taskId === updatedTask.taskId);
          if (index > -1) {
            this.tasks[index] = updatedTask;  
          }
          this.showTaskForm = false;
          
        },
        
      });
    }
    else
    {
      this.taskService.addTask(task).subscribe((newTask) => {
        this.tasks.push(newTask);  
        this.showTaskForm = false;         
      });
    
    }
  }
}
