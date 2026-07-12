import { Bot } from "mineflayer";


export class DangerDetector {


constructor(
private bot:Bot
){}



detect(){


const hostile = [

"creeper",
"zombie",
"skeleton"

];



return Object.values(
this.bot.entities
)
.some(
entity=>

hostile.includes(
entity.name || ""
)

);



}



}