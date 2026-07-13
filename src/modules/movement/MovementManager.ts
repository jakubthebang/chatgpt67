import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";

const { GoalFollow, GoalBlock } = goals;


export class MovementManager {

    private bot: Bot;


    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }



    follow(
        playerName: string
    ){

        const player =
            this.bot.players[playerName];



        if(
            !player ||
            !player.entity
        ){

            this.bot.chat(
                `Player ${playerName} not found`
            );

            return;

        }



        const movements =
            new Movements(
                this.bot
            );



        this.bot.pathfinder.setMovements(
            movements
        );



        this.bot.pathfinder.setGoal(
            new GoalFollow(
                player.entity,
                2
            )
        );



        this.bot.chat(
            `Following ${playerName}`
        );

    }





    goto(
        x: number,
        y: number,
        z: number
    ){



        const movements =
            new Movements(
                this.bot
            );



        this.bot.pathfinder.setMovements(
            movements
        );



        this.bot.pathfinder.setGoal(
            new GoalBlock(
                x,
                y,
                z
            )
        );



        this.bot.chat(
            `Going to ${x} ${y} ${z}`
        );

    }





    stop(){


        this.bot.pathfinder.stop();


        this.bot.chat(
            "Movement stopped"
        );


    }


}
