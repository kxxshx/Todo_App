import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-services';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  task_name!: string;
  task_desc!: string;
  taskForm!: FormGroup
  taskData: any
  task_id: number | any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private route: ActivatedRoute, private snackbar:MatSnackBar) {
    this.task_id = this.route.snapshot.queryParamMap.get('task_id');
    this.api.getTasksbyID(this.task_id).subscribe(res => {
      console.log(res);
      this.taskData = res.data
      console.log(this.taskData[0]);
      this.taskForm = this.fb.group({
        task_name: [this.taskData[0].task_name, [Validators.required, Validators.minLength(3)]],
        task_desc: [this.taskData[0].task_desc, [Validators.required]],
      })

    })
  }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      task_name: ['', [Validators.required, Validators.minLength(3)]],
      task_desc: ['', [Validators.required]],
    })
  }
  onClose() {
    this.router.navigate(['/dashboard']);
  }
  onSubmit() {

    this.task_name = this.taskForm.value.task_name
    this.task_desc = this.taskForm.value.task_desc;
    this.task_id = this.taskData[0].task_id
    console.log(this.task_id, this.task_name, this.task_desc);
    this.api.updateTask(this.task_id, this.task_name, this.task_desc).subscribe(res => {
      console.log(res);
      if (res.data) {
        this.snackbar.open("Task Updated Successfully", 'Close',{duration:3000})
        console.log("Updated" + this.task_name + this.task_desc);
        this.taskForm.reset();
        this.router.navigate(['/dashboard']);
      }
      else {
        console.log("cannot update");
      }
    })
  }
}


