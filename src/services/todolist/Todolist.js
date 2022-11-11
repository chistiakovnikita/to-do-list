import { Database } from '../database/Database';

class Todolist {
    constructor() {
        this.database = Database.getInstance();
    }

createTask(body) {
    return this.database.create('tasks', body);
}


}


export const todolist = new Todolist();