import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";
import { JumpController } from "./JumpController";

import { EnvironmentScanner } from "../environment/EnvironmentScanner";
import { PathDecisionSystem } from "./PathDecisionSystem";
import { RotationController } from "./RotationController";


const {
    GoalFollow,
    GoalBlock
} = goals;



export class MovementManager {


    private bot: Bot;

    private jump: JumpController;


    private scanner: EnvironmentScanner;

    private decision: PathDecisionSystem;


    private rotation: RotationController;

    private rotationTimer?: NodeJS.Timeout;



    private followTarget?: string;


    private stuckTimer?: NodeJS.Timeout;



    private lastPosition = {

        x:0,
        y:0,
        z:0

    };


    private stuckCounter = 0;







    constructor(

        bot: Bot,

        jump: JumpController

    ){


        this.bot = bot;

        this.jump = jump;



        this.scanner =
            new EnvironmentScanner(
                bot
            );


        this.decision =
            new PathDecisionSystem(

                bot,

                this.scanner

            );



        this.rotation =
            new RotationController(
                bot
            );


    }









    private createMovements(){


        const movements =
            new Movements(
                this.bot
            );



        movements.canDig = false;

        movements.allowSprinting = true;

        movements.allowParkour = false;

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



        this.jump.enable();




        this.rotationTimer =
            this.rotation.startFollowLook(
                playerName
            );







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






        this.startStuckDetection();




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


    }









    private startStuckDetection(){


        if(this.stuckTimer)
            return;




        this.stuckTimer =
            setInterval(()=>{


            if(!this.followTarget)
                return;





            if(

                this.decision.shouldRecalculate()

            ){

                this.recalculatePath();

                return;

            }






            const pos =
                this.bot.entity.position;





            const moved =

                Math.abs(
                    pos.x - this.lastPosition.x
                )

                +

                Math.abs(
                    pos.y - this.lastPosition.y
                )

                +

                Math.abs(
                    pos.z - this.lastPosition.z
                );






            if(moved < 0.15){

                this.stuckCounter++;

            }
            else{

                this.stuckCounter = 0;

            }





            if(this.stuckCounter >= 3){


                this.recalculatePath();

                this.stuckCounter = 0;


            }






            this.lastPosition = {

                x:pos.x,

                y:pos.y,

                z:pos.z

            };





        },1000);



    }









    private recalculatePath(){



        if(!this.followTarget)
            return;




        const player =
            this.bot.players[this.followTarget];





        if(
            player &&
            player.entity
        ){



            this.bot.pathfinder.setGoal(
                null
            );




            setTimeout(()=>{


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



            },200);



        }


    }









    stop(){



        if(this.stuckTimer){


            clearInterval(
                this.stuckTimer
            );


            this.stuckTimer = undefined;

        }






        if(this.rotationTimer){


            this.rotation.stop(
                this.rotationTimer
            );


            this.rotationTimer = undefined;


        }







        this.followTarget = undefined;



        this.stuckCounter = 0;





        this.jump.disable();





        this.bot.pathfinder.setGoal(null);





        this.bot.pathfinder.stop();





        this.bot.clearControlStates();



    }



}