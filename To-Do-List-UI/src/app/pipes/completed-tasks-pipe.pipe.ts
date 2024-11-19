import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedTasksPipe'
})
export class CompletedTasksPipePipe implements PipeTransform {

  transform(tasks:any[]): any[] {

    return tasks.filter(task=>task.isCompleted);
  }

}
