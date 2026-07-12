import { Bot } from "mineflayer";


export class BotAPI {


constructor(
private bot:Bot
){}



getStatus(){


return {


username:
this.bot.username,


health:
this.bot.health,


food:
this.bot.food,


position:{

x:
Math.floor(
this.bot.entity.position.x
),


y:
Math.floor(
this.bot.entity.position.y
),


z:
Math.floor(
this.bot.entity.position.z
)


}



};


}



command(
cmd:string
){


this.bot.chat(
cmd
);


}



}
