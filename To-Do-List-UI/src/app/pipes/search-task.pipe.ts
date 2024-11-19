import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/Task';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

  transform(tasks: Task[], searchQuery: string, selectedFilter: string): Task[] {

    // Filter tasks based on the search query
    let filteredTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

   
    if (selectedFilter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.isCompleted);
    } else if (selectedFilter === 'pending') {
      filteredTasks = filteredTasks.filter(task => !task.isCompleted);
    }

    return filteredTasks;
  }

   
  }

