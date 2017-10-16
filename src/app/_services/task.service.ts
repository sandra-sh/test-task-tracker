import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Task } from '../_models/task';

@Injectable()
export class TaskService {
    constructor(private http: Http) { }

    getTasks() {
        return this.http.get('/api/tasks').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/task/' + id).map((response: Response) => response.json());
    }

    updateTask(task: Task) {
        return this.http.put('/api/task/' + task.id, task).map((response: Response) => response.json());
    }

}
