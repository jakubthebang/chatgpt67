import { Bot } from "mineflayer";
import { Movements, goals } from "mineflayer-pathfinder";

const { GoalFollow, GoalBlock } = goals;


export class MovementManager {


    private bot: Bot;

    private followInterval?: NodeJS.Timeout;



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

        movements.allowSprinting = true;


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



        this.startSpeedSync(
            playerName
        );



        this.bot.chat(
            `Following ${playerName}`
        );


    }







    private startSpeedSync(
        playerName:string
    ){


        if(this.followInterval){

            clearInterval(
                this.followInterval
            );

        }



        this.followInterval =
            setInterval(()=>{


                const player =
                    this.bot.players[playerName];



                if(
                    !player ||
                    !player.entity
                )
                    return;



                const velocity =
                    player.entity.velocity;



                const speed =
                    Math.sqrt(
                        velocity.x ** 2 +
                        velocity.z ** 2
                    );



                this.bot.setControlState(
                    "sprint",
                    speed > 0.15
                );


            },500);


    }







    goto(
        x:number,
        y:number,
        z:number
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



        if(this.followInterval){

            clearInterval(
                this.followInterval
            );

            this.followInterval = undefined;

        }



        this.bot.setControlState(
            "sprint",
            false
        );



        this.bot.clearControlStates();



        this.bot.chat(
            "Movement stopped"
        );


    }


}
