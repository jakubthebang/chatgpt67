import { Bot } from "mineflayer";
import { Command } from "./Command";
import { MovementManager } from "../modules/movement/MovementManager";


export class GotoCommand implements Command {

    name = "goto";

    description = "Go to coordinates";


    constructor(
        private movement: MovementManager
    ){}


    execute(
        bot: Bot,
        args: string[]
    ){

        if(args.length < 3){

            bot.chat(
                "Usage: .goto <x> <y> <z>"
            );

            return;

        }


        const x = Number(args[0]);
        const y = Number(args[1]);
        const z = Number(args[2]);


        if(
            isNaN(x) ||
            isNaN(y) ||
            isNaN(z)
        ){

            bot.chat(
                "Invalid coordinates"
            );

            return;

        }


        this.movement.goto(
            x,
            y,
            z
        );

    }

}
