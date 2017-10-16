import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TESTUSERS } from '../_config/test-users';
import { TASKS } from '../_config/test-tasks';
localStorage.setItem('users', JSON.stringify(TESTUSERS));
localStorage.setItem('tasks', JSON.stringify(TASKS));

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users

    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let tasks: any[] = JSON.parse(localStorage.getItem('tasks')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstname: user.firstname,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }

                return;
            }

            // get tasks
            if (connection.request.url.endsWith('/api/tasks') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    let matchedTasks = tasks.filter(task => { return task.userid === currentUser.id });

                    // respond 200 OK with tasks
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedTasks })));
                return;
            }

            // get task by id
            if (connection.request.url.match(/\/api\/task\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    // find task by id in tasks array
                    let urlParts = connection.request.url.split('/');
                    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    let taskid = parseInt(urlParts[urlParts.length - 1]);
                    let matchedTask = tasks.find(task => { return task.id === taskid && task.userid === currentUser.id; });

                    // respond 200 OK with task details
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedTask })));
                return;
            }

            // get task by id
            if (connection.request.url.match(/\/api\/task\/\d+$/) && connection.request.method === RequestMethod.Put) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                // find task by id in tasks array
                let urlParts = connection.request.url.split('/');
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                let taskid = parseInt(urlParts[urlParts.length - 1]);
                let updatedTask = JSON.parse(connection.request.getBody());

                // respond 200 OK with task details
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: {id: updatedTask} })));
                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 100);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};