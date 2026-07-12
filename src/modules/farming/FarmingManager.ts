import { Bot } from "mineflayer";
import { CropDetector } from "./CropDetector";
import { FarmMemory } from "./FarmMemory";


export class FarmingManager {


private detector: CropDetector;
private memory: FarmMemory;



constructor(
    private bot:Bot
){

    this.detector =
        new CropDetector(bot);


    this.memory =
        new FarmMemory();

}



async harvest(){

const crops =
this.detector.findReadyCrops();



for(const crop of crops){

    await this.bot.dig(
        crop
    );


    this.memory.addHarvest(
        crop.name
    );

}


this.bot.chat(
`Harvested ${crops.length} crops`
);



}



async plant(
seed:string
){

const block =
this.bot.findBlock({

matching:block =>
block.name === "farmland",

maxDistance:32

});



if(!block){

this.bot.chat(
"No farmland found"
);

return;

}



const item =
this.bot.inventory.items()
.find(
i=>i.name.includes(seed)
);



if(!item){

this.bot.chat(
`No ${seed}`
);

return;

}



await this.bot.equip(
item,
"hand"
);



await this.bot.placeBlock(
block,
{ x:0, y:1, z:0 }
);



this.bot.chat(
"Crop planted"
);



}


}
