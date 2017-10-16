import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'login',  component: LoginComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'task-detail/:id', component: TaskDetailComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
