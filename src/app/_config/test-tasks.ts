import { Task } from '../_models/task';

export const TASKS: Task[] = [
    { id: 1, userid: 1, title: 'task1', date: '2017, 10, 15', status: 70},
    { id: 2, userid: 1, title: 'task2', date: '2017, 10, 14', status: 80},
    { id: 3, userid: 1, title: 'task3', date: '2017, 9, 15', status: 50},
    { id: 4, userid: 2, title: 'task4', date: '2017, 8, 13', status: 100},
    { id: 5, userid: 2, title: 'task5', date: '2017, 10, 10', status: 90},
    { id: 6, userid: 3, title: 'task6', date: '2017, 10, 12', status: 90}
];

localStorage.setItem('tasks', JSON.stringify(TASKS));
