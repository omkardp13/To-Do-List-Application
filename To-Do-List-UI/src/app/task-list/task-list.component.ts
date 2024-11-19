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

  constructor(private taskService: TaskService, private userAccount: UserAccountService) {
    // Get the current user
    this.userAccount.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.showTaskForm = false;
  }

  loadTasks(): void {
    // Load tasks only if current user is available
    if (this.currentUser?.userId) {  
      this.taskService.getTasks(this.currentUser.userId).subscribe((tasks) => {
        this.tasks = tasks;
        this.applyFilters();  // Apply filters and search after loading tasks
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

  resetFilters(): void {
    this.selectedFilter = 'all';
    this.searchQuery = '';  // Reset search query as well
    this.applyFilters();  // Reapply filters after reset
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.taskId !== taskId);
      this.applyFilters();  // Reapply filters after deleting a task
    });
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };  // Clone the task to avoid direct mutations
    this.showTaskForm = true;
  }

  onSaveTask(task: Task): void {
    if (this.currentUser?.userId) {  
      task.userId = this.currentUser.userId;
    }
    
    // Check if the task is being updated or newly added
    if (task.taskId !== 0) {
      this.taskService.updateTask(task.taskId, task).subscribe((updatedTask) => {
        const index = this.tasks.findIndex(t => t.taskId === updatedTask.taskId);
        if (index > -1) {
          this.tasks[index] = updatedTask;  // Update the task in the list
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
    // Filter tasks based on search query and task status (all, completed, pending)
    this.filteredTasks = this.tasks
      .filter(task => task.title.toLowerCase().includes(this.searchQuery.toLowerCase()))  // Filter by title
      .filter(task => {
        if (this.selectedFilter === 'completed') {
          return task.isCompleted;
        } else if (this.selectedFilter === 'pending') {
          return !task.isCompleted;
        }
        return true;  // Show all tasks if 'all' is selected
      });
  }
}
