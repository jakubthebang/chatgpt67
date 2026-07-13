import { Bot } from "mineflayer";

import { AIEngine } from "../core/AIEngine";
import { TaskManager } from "../core/TaskManager";

import { Command } from "./Command";

import { HelpCommand } from "./HelpCommand";
import { StatusCommand } from "./StatusCommand";
import { StopCommand } from "./StopCommand";
import { GotoCommand } from "./GotoCommand";
import { FollowCommand } from "./FollowCommand";

import { MovementManager } from "../modules/movement/MovementManager";


export class CommandManager {


    private commands: Map<string, Command> = new Map();


    private movement: MovementManager;



    constructor(
        private ai: AIEngine,
        private tasks: TaskManager,
        movement: MovementManager
    ){

        this.movement = movement;


        this.register(
            new HelpCommand()
        );


        this.register(
            new StatusCommand()
        );


        this.register(
            new StopCommand(
                this.tasks
            )
        );


        this.register(
            new GotoCommand(
                this.movement
            )
        );


        this.register(
            new FollowCommand(
                this.movement
            )
        );


    }





    register(
        command: Command
    ){


        this.commands.set(
            command.name,
            command
        );


    }





    handle(
        bot: Bot,
        username: string,
        message: string
    ){


        if(!message.startsWith("."))
            return;



        const args =
            message
                .substring(1)
                .split(" ");



        const commandName =
            args.shift();



        const command =
            this.commands.get(
                commandName!
            );



        if(!command){


            bot.chat(
                "Unknown command."
            );


            return;

        }



        command.execute(
            bot,
            args,
            username
        );


    }


}
