import { Bot } from "mineflayer";

import { EnemyDetector } from "./EnemyDetector";
import { CombatMemory } from "./CombatMemory";
import { DefenseSystem } from "./DefenseSystem";
import { CombatDecision, CombatAction } from "./CombatDecision";



export class CombatBrain {


    private detector: EnemyDetector;

    private memory: CombatMemory;

    private defense: DefenseSystem;

    private decision: CombatDecision;


    private running = false;

    private interval?: NodeJS.Timeout;




    constructor(
        private bot: Bot
    ){


        this.detector =
            new EnemyDetector(bot);


        this.memory =
            new CombatMemory();


        this.defense =
            new DefenseSystem(bot);


        this.decision =
            new CombatDecision(bot);


    }






    start(){


        if(this.running)
            return;


        this.running = true;



        this.bot.chat(
            "Combat AI enabled"
        );



        this.interval =
            setInterval(()=>{


                this.think();


            },500);



    }







    stop(){


        this.running = false;


        if(this.interval){

            clearInterval(
                this.interval
            );

            this.interval = undefined;

        }


    }








    private think(){



        const enemy =
            this.detector.nearest(12);





        if(!enemy){

            return;

        }






        const distance =
            this.bot.entity.position
            .distanceTo(
                enemy.position
            );






        if(enemy.name){

            this.memory.remember(
                enemy.name
            );

        }







        const action =
            this.decision.decide(

                enemy.name,

                distance

            );







        switch(action){



            case CombatAction.ATTACK:


                this.attack(
                    enemy
                );

                break;





            case CombatAction.ESCAPE:


                this.escape(
                    enemy
                );

                break;





            case CombatAction.HEAL:


                this.bot.chat(
                    "Need healing"
                );

                break;





            case CombatAction.RETREAT:


                this.retreat();

                break;



            default:

                break;


        }



    }







    private attack(enemy:any){


        this.bot.lookAt(
            enemy.position
        );


        this.bot.attack(
            enemy
        );


    }







    private escape(enemy:any){



        this.bot.setControlState(
            "back",
            true
        );



        setTimeout(()=>{


            this.bot.setControlState(
                "back",
                false
            );


        },700);



    }







    private retreat(){


        this.bot.setControlState(
            "back",
            true
        );


        setTimeout(()=>{


            this.bot.setControlState(
                "back",
                false
            );


        },500);



    }



}