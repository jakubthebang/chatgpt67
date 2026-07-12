import { Bot } from "mineflayer";
import { AnimalFinder } from "./AnimalFinder";
import { AnimalMemory } from "./AnimalMemory";


export class AnimalManager {


private finder: AnimalFinder;
private memory: AnimalMemory;



constructor(
    private bot:Bot
){

    this.finder =
        new AnimalFinder(bot);


    this.memory =
        new AnimalMemory();

}



findAnimals(
type:string
){


const animals =
this.finder.find(
    type
);


this.bot.chat(
`Found ${animals.length} ${type}`
);


return animals;

}



async feed(
animal:string,
food:string
){


const target =
this.finder.nearest(
    animal
);



if(!target){

this.bot.chat(
"No animal found"
);

return;

}



const item =
this.bot.inventory.items()
.find(
i=>i.name.includes(food)
);



if(!item){

this.bot.chat(
`Need ${food}`
);

return;

}



await this.bot.equip(
item,
"hand"
);



this.bot.activateEntity(
target
);



this.memory.remember(
animal
);



}



}
