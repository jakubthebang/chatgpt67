import { Bot } from "mineflayer";


export class DangerResponse {


constructor(
private bot:Bot
){}



shouldEscape(){

return this.bot.health < 6;

}



escape(){


const pos =
this.bot.entity.position;


this.bot.setControlState(
"back",
true
);



setTimeout(()=>{

this.bot.setControlState(
"back",
false
);


},2000);



}



}