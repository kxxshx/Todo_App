import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../services/api-services';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CompletedTaskComponent {
  id!: number;
  dataSource: TodoElement[] = [];
  columnsToDisplay = ['Name', 'Description', 'Completed_At'];
  expandedElement!: TodoElement | null;
  constructor(private api: ApiService, private router: Router, private authService: AuthService) {
    this.api.showTasks().subscribe(res => {
      console.log("hd");
      console.log(res.data);
      this.dataSource = res.data;
      this.id = res.data.task_id
      // console.log(this.dataSource)
    })
  }

  onlogout() {
    this.api.logout().subscribe((res) => {
      console.log(res);
      if (res) {
        this.authService.logout();
        this.router.navigate(['/login']);

      }
    })
  }
}
export interface TodoElement {
  task_id: number;
  task_name: string;
  task_desc: string;
  task_complete_at: Date;
}


