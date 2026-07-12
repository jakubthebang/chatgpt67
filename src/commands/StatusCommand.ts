import { Bot } from "mineflayer";
import { Command } from "./Command";


export class StatusCommand implements Command {


name="status";


description=
"Shows bot status";



execute(
bot:Bot
){


const pos =
bot.entity.position;


bot.chat(
`HP:${bot.health} Food:${bot.food} XYZ:${Math.floor(pos.x)} ${Math.floor(pos.y)} ${Math.floor(pos.z)}`
);


}


}
