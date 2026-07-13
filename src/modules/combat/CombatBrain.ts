import { Bot } from "mineflayer";

import { EnemyDetector } from "./EnemyDetector";
import { CombatMemory } from "./CombatMemory";
import { DefenseSystem } from "./DefenseSystem";



export class CombatBrain {


    private detector: EnemyDetector;

    private memory: CombatMemory;

    private defense: DefenseSystem;


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


            },1000);



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





        if(!enemy)
            return;








        // uloženie nepriateľa do pamäte

        if(enemy.name){

            this.memory.remember(
                enemy.name
            );

        }








        // creeper ochrana

        if(
            enemy.name === "creeper"
        ){


            const distance =
                this.bot.entity.position
                .distanceTo(
                    enemy.position
                );



            if(distance < 5){


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


                return;

            }


        }







        // automatický útok


        this.bot.lookAt(
            enemy.position
        );



        this.bot.attack(
            enemy
        );



    }



}