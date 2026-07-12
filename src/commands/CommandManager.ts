import { Bot } from "mineflayer";
import { AIEngine } from "../core/AIEngine";
import { TaskManager } from "../core/TaskManager";


export class CommandManager {


constructor(
    private ai:AIEngine,
    private tasks:TaskManager
){}



handle(
bot:Bot,
username:string,
message:string
){


if(!message.startsWith("."))
return;


const args =
message.substring(1)
.split(" ");


const command =
args.shift();



switch(command){


case "help":

bot.chat(
"Commands: .help .status .stop"
);

break;



case "status":

bot.chat(
`HP:${bot.health} Food:${bot.food}`
);

break;



case "stop":

this.tasks.clear();

bot.chat(
"All tasks stopped."
);

break;



default:

bot.chat(
"Unknown command."
);


}


}



}
