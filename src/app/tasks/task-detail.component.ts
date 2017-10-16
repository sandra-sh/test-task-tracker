import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AlertService } from '../_services/alert.service';

import { Task } from '../_models/task';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  task: Task;

  constructor(
      private router: Router,
      private taskService: TaskService,
      private route: ActivatedRoute,
      private location: Location,
      private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
        .switchMap((params: ParamMap) => this.taskService.getById(+params.get('id')))
        .subscribe(task => this.task = task);
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  updateTask() {
    this.taskService.updateTask(this.task)
        .subscribe(
            data => {
              this.alertService.success('Task has been updated');
              this.router.navigate(['/task-detail/' + this.task.id]);
            },
            error => {
              this.alertService.error(error);
            });
  }
}
