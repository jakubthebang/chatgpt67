export interface Goal {


name:string;


priority:number;


completed:boolean;


}



export class GoalManager {


private goals:Goal[]=[];



add(
goal:Goal
){

this.goals.push(
goal
);

}



getNext(){

return this.goals

.filter(
g=>!g.completed
)

.sort(
(a,b)=>
b.priority-a.priority
)[0];

}



complete(
name:string
){

const goal =
this.goals.find(
g=>g.name===name
);


if(goal){

goal.completed=true;

}


}



list(){

return this.goals;

}


}
