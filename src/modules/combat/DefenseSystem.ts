import { Bot } from "mineflayer";


export class DefenseSystem {


private active=false;



constructor(
private bot:Bot
){}



enable(){

this.active=true;


this.bot.chat(
"Defense mode enabled"
);


}



disable(){

this.active=false;


}



isActive(){

return this.active;

}



}
