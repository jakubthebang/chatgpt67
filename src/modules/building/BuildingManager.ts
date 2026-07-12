import { Bot } from "mineflayer";
import { Builder } from "./Builder";
import { BlueprintLoader } from "./BlueprintLoader";
import { MaterialChecker } from "./MaterialChecker";


export class BuildingManager {


private builder: Builder;
private loader: BlueprintLoader;
private materials: MaterialChecker;



constructor(
    private bot: Bot
){

    this.builder =
        new Builder(bot);


    this.loader =
        new BlueprintLoader();


    this.materials =
        new MaterialChecker(bot);

}



async build(
blueprint:string
){


const structure =
this.loader.load(
    blueprint
);



if(!structure){

this.bot.chat(
"No blueprint found"
);

return;

}



if(
!this.materials.check(
structure
)
){

this.bot.chat(
"Missing materials"
);

return;

}



await this.builder.build(
structure
);



this.bot.chat(
"Building completed"
);



}


}
