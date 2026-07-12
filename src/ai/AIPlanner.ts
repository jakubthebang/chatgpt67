import { GoalManager } from "./GoalManager";
import { DecisionEngine } from "./DecisionEngine";
import { KnowledgeBase } from "./KnowledgeBase";


export class AIPlanner {


private goals:GoalManager;

private decision:DecisionEngine;

private memory:KnowledgeBase;



constructor(){


this.goals =
new GoalManager();



this.memory =
new KnowledgeBase();



this.decision =
new DecisionEngine(
    this.goals
);


}



think(
input:string
){


this.memory.set(
"last_input",
input
);



if(
input.includes(
"diamond pickaxe"
)
){

this.goals.add({

name:
"craft diamond pickaxe",

priority:10,

completed:false

});

}



return this.decision.decide();



}



remember(
key:string,
value:any
){

this.memory.set(
key,
value
);

}



recall(
key:string
){

return this.memory.get(
key
);

}



}
