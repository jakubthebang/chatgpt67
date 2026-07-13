import { Bot } from "mineflayer";
import { Command } from "./Command";
import { TaskManager } from "../core/TaskManager";


export class StopCommand implements Command {


    name = "stop";


    description =
        "Stops all tasks";



    constructor(
        private tasks: TaskManager
    ){}



    execute(
        bot: Bot,
        args: string[],
        username: string
    ){


        this.tasks.cancelAll();


        bot.chat(
            "All tasks stopped."
        );


    }


}
