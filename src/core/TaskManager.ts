import { Task } from "./Task";


export class TaskManager {

    private tasks: Task[] = [];


    add(task: Task) {

        this.tasks.push(task);

    }


    getTasks(): Task[] {

        return this.tasks;

    }


    get(id:string): Task | undefined {

        return this.tasks.find(
            task => task.id === id
        );

    }


    remove(id:string) {

        this.tasks =
            this.tasks.filter(
                task => task.id !== id
            );

    }


    clear() {

        this.tasks = [];

    }

}
