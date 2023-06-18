import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class ApiService {
  constructor(private http: HttpClient) { }
  login(email_address: string, password: string) {
    return this.http.post("http://localhost:3000/login", { email: email_address, password: password }, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }))
  }
  register(username: string, email_address: string, password: string) {
    return this.http.post("http://localhost:3000/signup", { username: username, email: email_address, password: password })
      .pipe(map((res: any) => {
        return res;
      }))
  }
  addTask(task_name: string, task_desc: string) {
    return this.http.post("http://localhost:3000/addTodos", { task_name: task_name, task_desc: task_desc }, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getTasks() {
    return this.http.get("http://localhost:3000/getTodos", { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getTasksbyID(task_id: number) {
    let params = new HttpParams();
    params = params.append("id", task_id);
    return this.http.get("http://localhost:3000/getTodos", { params: params, withCredentials: true },)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  updateTask(task_id: number, task_name: string, task_desc: string) {
    return this.http.put("http://localhost:3000/updateTodos", { task_id: task_id, task_name: task_name, task_desc: task_desc }, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteTask(data: number) {
    return this.http.delete("http://localhost:3000/deleteTodos", {
      body: {
        task_id: data
      },
      withCredentials: true
    })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  completedTask(data: number) {
    return this.http.post("http://localhost:3000/completeTodos", { task_id: data }, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  showTasks() {
    return this.http.post("http://localhost:3000/showCompleted", {}, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  logout() {
    return this.http.post("http://localhost:3000/logout", {}, { withCredentials: true }).pipe(map((res: any) => {
      return res;
    }))
  }
}


