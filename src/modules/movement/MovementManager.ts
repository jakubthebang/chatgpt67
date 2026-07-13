import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";


const {
    GoalFollow,
    GoalBlock
} = goals;



export class MovementManager {


    private bot: Bot;

    private followTarget?: string;

    private stuckTimer?: NodeJS.Timeout;


    private lastPosition = {
        x: 0,
        y: 0,
        z: 0
    };





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

        movements.allowSprinting = true;

        movements.allowParkour = true;

        movements.allow1by1towers = false;

        movements.canOpenDoors = true;

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





        this.stop();




        this.followTarget =
            playerName;





        this.bot.pathfinder.setMovements(
            this.createMovements()
        );





        this.bot.pathfinder.setGoal(


            new GoalFollow(

                player.entity,

                1

            ),


            true


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


        this.stop();




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



        if(this.stuckTimer){


            clearInterval(
                this.stuckTimer
            );


            this.stuckTimer = undefined;


        }





        this.followTarget = undefined;





        this.bot.pathfinder.setGoal(
            null
        );





        this.bot.pathfinder.stop();





        this.bot.clearControlStates();



    }




}