import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task_name!: string;
  task_desc!: string;
  taskForm!: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router , private snackbar:MatSnackBar) { }

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
    if (this.taskForm.valid) {

      this.task_name = this.taskForm.value.task_name
      this.task_desc = this.taskForm.value.task_desc;
      this.api.addTask(this.task_name, this.task_desc).subscribe(res => {
        console.log(res);
        if (res.data) {
          this.snackbar.open("Todo Created Successfully" , 'Close',{duration:3000})
          console.log("Created" + this.task_name + this.task_desc);
          this.taskForm.reset();
          this.router.navigate(['/dashboard']);
        }
        else {
          console.log("cannot create");
        }
      })
    }
  }
}
