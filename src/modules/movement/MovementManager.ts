import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";


const {
    GoalFollow,
    GoalBlock
} = goals;



export class MovementManager {


    private bot: Bot;

    private followInterval?: NodeJS.Timeout;

    private currentTarget?: string;



    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }





    private setupMovements(){


        const movements =
            new Movements(
                this.bot
            );


        // pohybové pravidlá

        movements.canDig = false;

        movements.allowSprinting = true;

        movements.allowParkour = false;

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



        this.currentTarget =
            playerName;



        this.bot.pathfinder.setMovements(
            this.setupMovements()
        );



        this.bot.pathfinder.setGoal(
            new GoalFollow(
                player.entity,
                3
            ),
            true
        );



        this.followInterval =
            setInterval(()=>{


                if(!this.currentTarget)
                    return;



                const target =
                    this.bot.players[this.currentTarget];



                if(
                    !target ||
                    !target.entity
                )
                    return;



                this.bot.pathfinder.setGoal(
                    new GoalFollow(
                        target.entity,
                        3
                    ),
                    true
                );


            },500);



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
            this.setupMovements()
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


        if(this.followInterval){

            clearInterval(
                this.followInterval
            );

            this.followInterval = undefined;

        }



        this.currentTarget =
            undefined;



        this.bot.pathfinder.setGoal(
            null
        );



        this.bot.pathfinder.stop();



        this.bot.clearControlStates();


    }



}
