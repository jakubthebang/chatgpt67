import { Bot } from "mineflayer";
import { Command } from "./Command";
import { MovementManager } from "../modules/movement/MovementManager";


export class ComeCommand implements Command {

    name = "come";

    description = "Come to the player";


    constructor(
        private movement: MovementManager
    ){}


    execute(
        bot: Bot,
        args: string[]
    ){

        const player = bot.players[bot.username];


        if(!player || !player.entity){

            bot.chat(
                "Cannot find your position"
            );

            return;

        }


        const pos = player.entity.position;


        this.movement.goto(
            Math.floor(pos.x),
            Math.floor(pos.y),
            Math.floor(pos.z)
        );


        bot.chat(
            "Coming to you"
        );

    }

}
