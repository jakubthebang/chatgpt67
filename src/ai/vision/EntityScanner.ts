import { Bot } from "mineflayer";


export class EntityScanner {


constructor(
private bot:Bot
){}



scan(){


return Object.values(
this.bot.entities
)
.map(entity=>({


name:
entity.name,


position:
entity.position



}));



}



findPlayer(
name:string
){


return Object.values(
this.bot.players
)
.find(
player =>
player.username===name
);


}



}