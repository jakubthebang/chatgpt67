import { Bot } from "mineflayer";


export class StructureFinder {


constructor(
private bot:Bot
){}



find(
structure:string
){


const entities =
Object.values(
this.bot.entities
);



const found =
entities.find(
entity =>
entity.name === structure
);



return found ?? null;


}



}
