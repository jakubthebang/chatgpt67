import { Bot } from "mineflayer";
import { CommandRegistry } from "./CommandRegistry";
import { CommandParser } from "./CommandParser";


export class CommandManager {


private registry =
new CommandRegistry();



private parser =
new CommandParser();



constructor(
private bot:Bot
){}



register(
command:any
){

this.registry.register(
command
);


}



handle(
username:string,
message:string
){


const parsed =
this.parser.parse(
message
);



if(!parsed)
return;



const command =
this.registry.get(
parsed.command!
);



if(!command){

this.bot.chat(
"Unknown command"
);


return;

}



command.execute(
this.bot,
parsed.args,
{

username,

source:
"minecraft"


}

);



}



}