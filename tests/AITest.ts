import { AIPlanner } from "../src/ai/AIPlanner";


export class AITest {


run(){


const ai =
new AIPlanner();



const result =
ai.think(
"chcem diamantovy krompac"
);



if(result){

console.log(
"✓ AI Planner OK"
);


return true;

}



console.log(
"✗ AI Planner failed"
);



return false;


}



}