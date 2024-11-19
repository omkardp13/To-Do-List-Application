import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: Task = {
    taskId: 0,
    userId: 0,
    title: '',
    description: '',
    isCompleted: false,
    createdAt: new Date()
  };

  @Output() save = new EventEmitter<Task>();

  onSubmit() {

    this.save.emit(this.task);
  }
}

