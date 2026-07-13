import { Task } from "./Task";

export class TaskQueue {

    private queue: Task[] = [];

    add(task: Task) {

        this.queue.push(task);

        this.queue.sort(
            (a, b) => b.priority - a.priority
        );
    }

    next(): Task | undefined {
        return this.queue.shift();
    }

    peek(): Task | undefined {
        return this.queue[0];
    }

    clear() {
        this.queue = [];
    }

    size() {
        return this.queue.length;
    }

    list() {
        return this.queue;
    }

}
