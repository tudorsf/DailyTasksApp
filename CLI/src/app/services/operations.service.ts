import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root'
  })

  export class OperationsService {
    constructor(private http: HttpClient) {}

    addTask(task: Task){
      return this.http.post('https://localhost:7082/api/ToDo/addTask', task)
    }

    getTasks(id: any){
      return this.http.get('https://localhost:7082/api/ToDo/GetTasks/'+ id)
    }

    editTask(task: Task){
      return this.http.post('https://localhost:7082/api/ToDo/editTask', task)
    }

    deleteTask(id: any){
      return this.http.delete('https://localhost:7082/api/ToDo/deleteTask/'+ id)
    }



  }