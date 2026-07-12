import { Bot } from "mineflayer";
import { ChunkMemory } from "./ChunkMemory";
import { LocationMemory } from "./LocationMemory";
import { DangerDetector } from "./DangerDetector";


export class WorldManager {


private chunks:ChunkMemory;

private locations:LocationMemory;

private danger:DangerDetector;



constructor(
private bot:Bot
){


this.chunks =
new ChunkMemory();


this.locations =
new LocationMemory();


this.danger =
new DangerDetector(bot);


}



scan(){

const pos =
this.bot.entity.position;



this.chunks.remember(
`${Math.floor(pos.x/16)}:${Math.floor(pos.z/16)}`
);



}



saveLocation(
name:string
){

this.locations.add(
name,
this.bot.entity.position
);


}



isDanger(){

return this.danger.detect();

}



}