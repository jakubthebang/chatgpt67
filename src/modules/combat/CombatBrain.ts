import { Bot } from "mineflayer";

import { EnemyDetector } from "./EnemyDetector";
import { CombatMemory } from "./CombatMemory";
import { DefenseSystem } from "./DefenseSystem";
import { CombatDecision, CombatAction } from "./CombatDecision";
import { CombatHeal } from "./CombatHeal";
import { WeaponManager } from "./WeaponManager";



export class CombatBrain {


    private detector: EnemyDetector;

    private memory: CombatMemory;

    private defense: DefenseSystem;

    private decision: CombatDecision;

    private healer: CombatHeal;

    private weapon: WeaponManager;


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



        this.healer =
            new CombatHeal(bot);



        this.weapon =
            new WeaponManager(bot);


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








    private async think(){



        const enemy =
            this.detector.nearest(12);




        if(!enemy)
            return;






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


                await this.attack(
                    enemy
                );


                break;







            case CombatAction.ESCAPE:


                this.escape();


                break;







            case CombatAction.HEAL:


                this.heal();


                break;







            case CombatAction.RETREAT:


                this.retreat();


                break;







            case CombatAction.IDLE:


                break;



        }



    }









    private async attack(
        enemy:any
    ){


        await this.weapon.equipBestWeapon();



        this.bot.lookAt(
            enemy.position
        );



        this.bot.attack(
            enemy
        );


    }









    private async heal(){


        const result =
            await this.healer.heal();



        if(result){


            console.log(
                "[CombatAI] Healing"
            );


        }


    }









    private escape(){



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