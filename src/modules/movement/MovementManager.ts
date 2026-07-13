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



    private createMovements(){

        const movements =
            new Movements(
                this.bot
            );


        movements.canDig = false;

        movements.allow1by1towers = false;

        movements.allowParkour = true;


        return movements;

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
            this.createMovements();



        this.bot.pathfinder.setMovements(
            movements
        );



        this.bot.pathfinder.setGoal(
            new GoalFollow(
                player.entity,
                2
            ),
            true
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
            this.createMovements();



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
