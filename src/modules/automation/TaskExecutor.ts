import { Bot } from "mineflayer";
import { AutomationTask } from "./AutomationTask";


export class TaskExecutor {


constructor(
private bot:Bot
){}



async execute(
task:AutomationTask
){


task.status="running";



try{


switch(task.type){


case "chat":

await this.bot.chat(
task.data.message
);

break;



case "wait":

await new Promise(
resolve=>
setTimeout(
resolve,
task.data.time
)
);

break;



}



task.status="completed";



}catch{


task.status="failed";


}



}



}