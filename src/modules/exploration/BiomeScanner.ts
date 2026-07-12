import { Bot } from "mineflayer";


export class BiomeScanner {


constructor(
private bot:Bot
){}



scan(){

const pos =
this.bot.entity.position;



const biome =
this.bot.blockAt(
pos
)?.biome;



return biome?.name ?? "unknown";

}



}
