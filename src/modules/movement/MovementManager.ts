import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";

const { GoalFollow, GoalBlock } = goals;


export class MovementManager {


    private bot: Bot;

    private following = false;

    private followPlayer = "";



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

        movements.allowParkour = true;

        movements.allowSprinting = true;

        movements.canOpenDoors = true;

        movements.allow1by1towers = true;

        movements.maxDropDown = 3;


        return movements;

    }





    follow(
        playerName:string
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



        this.following = true;

        this.followPlayer = playerName;



        this.bot.pathfinder.setMovements(
            this.createMovements()
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
        x:number,
        y:number,
        z:number
    ){


        this.following = false;


        this.bot.pathfinder.setMovements(
            this.createMovements()
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


        this.following = false;

        this.followPlayer = "";



        this.bot.pathfinder.setGoal(
            null
        );



        this.bot.pathfinder.stop();



        this.bot.clearControlStates();



        this.bot.chat(
            "Movement stopped"
        );


    }


}
