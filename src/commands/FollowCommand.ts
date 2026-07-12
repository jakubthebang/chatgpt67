import { Bot } from "mineflayer";
import { Command } from "./Command";
import { MovementManager } from "../modules/movement/MovementManager";


export class FollowCommand implements Command {

    name = "follow";

    description = "Follow a player";


    constructor(
        private movement: MovementManager
    ){}


    execute(
        bot: Bot,
        args: string[]
    ){

        const player = args[0];


        if(!player){

            bot.chat(
                "Usage: .follow <player>"
            );

            return;

        }


        this.movement.follow(
            player
        );

    }

}
