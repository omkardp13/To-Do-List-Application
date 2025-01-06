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
  
  filteredTasks: Task[] = [];
  selectedFilter: string = 'all';  
  searchQuery: string = ''; 

  paginatedTasks : Task[]=[];
  currentPage = 1;
  tasksPerPage = 5;

  currentUser: User | null = null;
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

  constructor(private taskService: TaskService, public userAccount: UserAccountService) {
    
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
        this.applyFilters(); 
      });
    }
  }

  updatePaginatedTasks() {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedTasks();
  }
  getTotalPages(): number {
    return Math.ceil(this.filteredTasks.length / this.tasksPerPage);
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

  resetFilters(): void {
    this.selectedFilter = 'all';
    this.searchQuery = '';  
    this.currentPage = 1;
    this.applyFilters();  
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.taskId !== taskId);
      this.applyFilters();  
    });
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task }; 
    this.showTaskForm = true;
  }

  onSaveTask(task: Task): void {
    if (this.currentUser?.userId) {  
      task.userId = this.currentUser.userId;
    }
    
   
    if (task.taskId !== 0) {
      this.taskService.updateTask(task.taskId, task).subscribe((updatedTask) => {
        const index = this.tasks.findIndex(t => t.taskId === updatedTask.taskId);
        if (index > -1) {
          this.tasks[index] = updatedTask; 
        }
        this.showTaskForm = false;
        this.applyFilters();  // Reapply filters after saving
      });
    } else {
      this.taskService.addTask(task).subscribe((newTask) => {
        this.tasks.push(newTask);
        this.showTaskForm = false;
        this.applyFilters();  // Reapply filters after adding
      });
    }
  }

  applyFilters(): void {
   
    this.filteredTasks = this.tasks
      .filter(task => task.title.toLowerCase().includes(this.searchQuery.toLowerCase())) 
      .filter(task => {
        if (this.selectedFilter === 'completed') {
          return task.isCompleted;
        } else if (this.selectedFilter === 'pending') {
          return !task.isCompleted;
        }
        return true; 
      });

      this.updatePaginatedTasks();
  }
}
