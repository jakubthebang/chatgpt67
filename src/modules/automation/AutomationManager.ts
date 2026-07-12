import { Bot } from "mineflayer";
import { TaskQueue } from "./TaskQueue";
import { TaskExecutor } from "./TaskExecutor";


export class AutomationManager {


private queue:TaskQueue;

private executor:TaskExecutor;



constructor(
private bot:Bot
){


this.queue =
new TaskQueue();



this.executor =
new TaskExecutor(bot);


}



addTask(
task:any
){

this.queue.add(
task
);


}



async run(){


const task =
this.queue.next();



if(!task)
return;



await this.executor.execute(
task
);



}



getTasks(){

return this.queue.list();

}



}