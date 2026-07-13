import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";


const {
    GoalFollow,
    GoalBlock
} = goals;



export class MovementManager {


    private bot: Bot;


    private followTarget?: string;


    private followTimer?: NodeJS.Timeout;


    private lastPosition = {
        x: 0,
        y: 0,
        z: 0
    };


    private stuckTimer?: NodeJS.Timeout;





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




        this.followTarget =
            playerName;




        this.bot.pathfinder.setMovements(
            this.createMovements()
        );





        this.bot.pathfinder.setGoal(

            new GoalFollow(

                player.entity,

                3

            ),

            true

        );




        this.startStuckDetection();




        this.followTimer =
            setInterval(()=>{


                const target =
                    this.bot.players[this.followTarget!];



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




        this.startStuckDetection();




        this.bot.chat(
            `Going to ${x} ${y} ${z}`
        );


    }









    private startStuckDetection(){


        this.stuckTimer =
            setInterval(()=>{


                const pos =
                    this.bot.entity.position;



                const moved =
                    Math.abs(pos.x - this.lastPosition.x) +
                    Math.abs(pos.y - this.lastPosition.y) +
                    Math.abs(pos.z - this.lastPosition.z);



                if(moved < 0.2){


                    this.bot.pathfinder.stop();



                    if(this.followTarget){


                        const player =
                            this.bot.players[this.followTarget];



                        if(
                            player &&
                            player.entity
                        ){

                            this.bot.pathfinder.setGoal(

                                new GoalFollow(

                                    player.entity,

                                    3

                                ),

                                true

                            );

                        }


                    }


                }



                this.lastPosition = {

                    x: pos.x,

                    y: pos.y,

                    z: pos.z

                };



            },3000);


    }









    stop(){


        if(this.followTimer){

            clearInterval(
                this.followTimer
            );

            this.followTimer = undefined;

        }



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