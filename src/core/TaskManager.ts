export interface Task {

    id:number;
    name:string;
    status:
    "waiting" |
    "running" |
    "completed" |
    "cancelled";

}


export class TaskManager {


    private tasks:Task[] = [];


    add(task:Task){

        this.tasks.push(task);

    }


    getTasks(){

        return this.tasks;

    }


    clear(){

        this.tasks=[];

    }


}
