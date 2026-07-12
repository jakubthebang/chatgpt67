import { Bot } from "mineflayer";
import { Command } from "./Command";
import { MiningManager } from "../modules/mining/MiningManager";


export class MineCommand implements Command {


name="mine";


description=
"Mine ores";



constructor(
private mining:MiningManager
){}



execute(
bot:Bot,
args:string[]
){


const ore =
args[0];


if(!ore){

bot.chat(
"Usage: .mine <ore>"
);

return;

}



this.mining.mine(
ore
);


}



}
