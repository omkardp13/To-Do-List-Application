import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inCompletedTask'
})
export class InCompletedTaskPipe implements PipeTransform {

  transform(tasks:any[]): any[] {
    return tasks.filter(task=>task=!task.isCompleted);
  }

}
