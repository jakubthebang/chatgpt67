import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";


const { GoalFollow, GoalBlock } = goals;



export class MovementManager {


    private bot: Bot;

    private followingPlayer?: string;

    private followTimer?: NodeJS.Timeout;



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

        movements.allow1by1towers = false;

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



        this.followingPlayer =
            playerName;



        this.bot.pathfinder.setMovements(
            this.createMovements()
        );



        this.bot.pathfinder.setGoal(
            new GoalFollow(
                player.entity,
                2
            ),
            true
        );



        this.followTimer =
            setInterval(()=>{


                if(!this.followingPlayer)
                    return;



                const target =
                    this.bot.players[this.followingPlayer];



                if(
                    !target ||
                    !target.entity
                )
                    return;



                this.bot.pathfinder.setGoal(
                    new GoalFollow(
                        target.entity,
                        2
                    ),
                    true
                );


            },1000);



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


        if(this.followTimer){

            clearInterval(
                this.followTimer
            );

            this.followTimer = undefined;

        }



        this.followingPlayer = undefined;



        this.bot.pathfinder.stop();



        this.bot.clearControlStates();


    }


}
