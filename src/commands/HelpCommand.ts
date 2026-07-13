import { Bot } from "mineflayer";
import { Command } from "./Command";


export class HelpCommand implements Command {


    name = "help";


    description =
        "Shows available commands";



    execute(
        bot: Bot,
        args: string[],
        username: string
    ){


        bot.chat(
            "Commands: .help .status .stop"
        );


    }


}
