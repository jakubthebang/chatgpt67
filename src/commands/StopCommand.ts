import { Bot } from "mineflayer";
import { Command } from "./Command";
import { TaskManager } from "../core/TaskManager";
import { MovementManager } from "../modules/movement/MovementManager";



export class StopCommand implements Command {


    name = "stop";


    description =
        "Stops all tasks and movement";





    constructor(

        private tasks: TaskManager,

        private movement: MovementManager

    ){}





    execute(

        bot: Bot,

        args: string[],

        username: string

    ){


        // zastaví AI úlohy

        this.tasks.cancelAll();



        // zastaví follow/goto/pathfinder

        this.movement.stop();



        bot.chat(
            "All tasks and movement stopped."
        );


    }


}