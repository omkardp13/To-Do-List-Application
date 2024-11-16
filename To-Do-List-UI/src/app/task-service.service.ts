import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7164/api/tasks';

  constructor(private http: HttpClient) {}

  // Fetch tasks
  getTasks(userId: number): Observable<Task[]> {
    const url = `${this.apiUrl}?id=${userId}`;
    return this.http.get<Task[]>(url);
  }
  

  // Add a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  
  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.apiUrl}/${taskId}`);
  }
  
}
