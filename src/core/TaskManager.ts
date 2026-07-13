import { Task } from "./Task";


export class TaskManager {

    private tasks: Task[] = [];


    add(task: Task) {

        this.tasks.push(task);

    }


    getTasks(): Task[] {

        return this.tasks;

    }


    get(id: string): Task | undefined {

        return this.tasks.find(
            task => task.id === id
        );

    }


    update(
        id: string,
        status: Task["status"]
    ) {

        const task = this.get(id);

        if (task) {
            task.status = status;
        }

    }


    remove(id: string) {

        this.tasks =
            this.tasks.filter(
                task => task.id !== id
            );

    }


    clear() {

        this.tasks = [];

    }


    count() {

        return this.tasks.length;

    }


    cancelAll() {

        this.tasks.forEach(
            task => {
                task.status = "failed";
            }
        );

    }

}
