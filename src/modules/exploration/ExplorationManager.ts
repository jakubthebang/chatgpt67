import { Bot } from "mineflayer";
import { BiomeScanner } from "./BiomeScanner";
import { StructureFinder } from "./StructureFinder";
import { MapMemory } from "./MapMemory";


export class ExplorationManager {


private biome:BiomeScanner;
private structures:StructureFinder;
private memory:MapMemory;



constructor(
    private bot:Bot
){

    this.biome =
        new BiomeScanner(bot);


    this.structures =
        new StructureFinder(bot);


    this.memory =
        new MapMemory();

}



scanBiome(){

const biome =
this.biome.scan();


this.memory.rememberBiome(
    biome
);


this.bot.chat(
`Biome: ${biome}`
);


return biome;

}



findStructure(
name:string
){

const structure =
this.structures.find(
    name
);


if(structure){

this.memory.rememberStructure(
    name
);


}


return structure;

}



explore(){

this.bot.chat(
"Exploration started"
);


}


}
