import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable, DataTableResource } from 'angular-4-data-table';

import { Task } from '../_models/task';
import { User } from '../_models/user';
import { TaskService } from '../_services/task.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    styleUrls: [ './tasks.component.css' ],
    providers: [TaskService]
})

export class TasksComponent implements OnInit {
    tasks: Task[] = [];
    selectedTask: Task;
    currentUser: User;
    percentMin = 0;
    percentMax= 100;
    tasksResource = new DataTableResource(this.tasks);

    constructor(
        private router: Router,
        private taskService: TaskService,
        private userService: UserService ) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

    ngOnInit(): void {
        this.getTasks();
    }

    private getTasks(): void {
        this.taskService.getTasks().subscribe(tasks => {
            this.tasksResource = new DataTableResource(tasks);
            this.tasks = tasks;
        });
    }

    gotoDetail(task: Task): void {
        this.selectedTask = task;
        this.router.navigate(['/task-detail', this.selectedTask.id]);
    }

    reloadTasks(params) {
       this.tasksResource.query(params).then(tasks => this.tasks = tasks);
    }

}
