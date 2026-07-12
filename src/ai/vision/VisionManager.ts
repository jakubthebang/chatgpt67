import { Bot } from "mineflayer";
import { BlockScanner } from "./BlockScanner";
import { EntityScanner } from "./EntityScanner";
import { EnvironmentAnalyzer } from "./EnvironmentAnalyzer";


export class VisionManager {


private blocks:BlockScanner;

private entities:EntityScanner;

private analyzer:EnvironmentAnalyzer;



constructor(
private bot:Bot
){


this.blocks =
new BlockScanner(bot);


this.entities =
new EntityScanner(bot);


this.analyzer =
new EnvironmentAnalyzer();


}



scan(){


return {


blocks:
this.blocks.scan(),


entities:
this.entities.scan(),


environment:
this.analyzer.analyze(
this.bot
)


};



}



}