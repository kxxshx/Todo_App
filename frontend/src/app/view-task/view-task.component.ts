import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../services/api-services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewTaskComponent {
  checked = false;
  id!: number;
  dataSource: TodoElement[] = [];
  columnsToDisplay = ['Action', 'Name'];
  expandedElement!: TodoElement | null;
  constructor(private api: ApiService, private router: Router, private snackbar:MatSnackBar) {
    this.api.getTasks().subscribe(res => {
      console.log(res.data);
      this.dataSource = res.data;
      this.id = res.data.task_id
      // console.log(this.dataSource)
    })
  }

  currentMode = 'tasklist';

  changeView(target: string) {
    this.currentMode = target;
  }

  onDelete(task_id: number) {
    console.log("delete", task_id);
    this.api.deleteTask(task_id).subscribe(res => {
      console.log(res);
      this.api.getTasks().subscribe(res => {
        console.log(res.data);
        this.dataSource = res.data;
        this.id = res.data.task_id
        // console.log(this.dataSource)
      })
    })
    this.snackbar.open("Todo Deleted Successfully", 'Close',{duration:3000});
  }

  onComplete(task_id: number) {
    console.log("completed", task_id);
    this.api.completedTask(task_id).subscribe(res => {
      console.log(res)
      this.api.getTasks().subscribe(res => {
        console.log(res.data);
        this.dataSource = res.data;
        this.id = res.data.task_id
        // console.log(this.dataSource)
      })
    })

  }
  onEdit(task_id: number) {
    this.router.navigate(['/editTask'], { queryParams: { task_id } });

    console.log(`${task_id}`)

  }
}
export interface TodoElement {
  task_id: number;
  task_name: string;
  task_desc: string;
}

