import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../model/ITask';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TASKS_BY_USER_API = 'http://192.168.0.14:5000/api/users/';
  private TASK_API = 'http://192.168.0.14:5000/api/task';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService) { }

  getAll(): Observable<any> {
    var userId = this.tokenStorage.getUser()._id;
    return this.http.get<any>(this.TASKS_BY_USER_API + userId +"/task");
  }

  deleteAll(){

  }

  delete(task: ITask): Observable<any>{
    return this.http.delete<any>(this.TASK_API + "/" +task._id, {headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    }) });
  }

  create(task): Observable<any> {
    return this.http.post<any>(this.TASK_API, JSON.stringify(task),this.httpOptions);
  }

  editTask(task: ITask): Observable<any> {
    return this.http.patch<any>(this.TASK_API + "/" +task._id, JSON.stringify(task),this.httpOptions);
  }
}
