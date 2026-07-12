import { AutomationTask } from "./AutomationTask";


export class TaskQueue {


private tasks:
AutomationTask[] = [];



add(
task:AutomationTask
){

this.tasks.push(
task
);


this.sort();

}



private sort(){

this.tasks.sort(
(a,b)=>
b.priority-a.priority
);


}



next(){

return this.tasks.find(
task=>
task.status==="waiting"
);

}



remove(
id:string
){

this.tasks =
this.tasks.filter(
task=>
task.id!==id
);

}



list(){

return this.tasks;

}


}