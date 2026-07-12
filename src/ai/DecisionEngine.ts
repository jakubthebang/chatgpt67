import { GoalManager } from "./GoalManager";


export class DecisionEngine {


constructor(
private goals:GoalManager
){}



decide(){


const goal =
this.goals.getNext();



if(!goal){

return {

action:"idle"

};

}



return {

action:"execute",

goal:goal.name

};


}



}
