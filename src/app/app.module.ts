import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTableModule } from 'angular-4-data-table';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert.component';
import { AlertService } from './_services/alert.service';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { TaskService } from './_services/task.service';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail.component';
import { FilterPipe } from './_pipes/filter.pipe';

import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    TasksComponent,
    TaskDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    DataTableModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    UserService,
    TaskService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
