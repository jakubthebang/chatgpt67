import { Bot } from "mineflayer";


export enum CombatAction {

    IDLE = "IDLE",

    ATTACK = "ATTACK",

    RETREAT = "RETREAT",

    ESCAPE = "ESCAPE",

    HEAL = "HEAL"

}





export class CombatDecision {


    constructor(
        private bot: Bot
    ){}




    decide(
        enemyName?: string,
        distance: number = 999
    ): CombatAction {



        const health =
            this.bot.health;



        // nízke HP = útek a liečenie

        if(
            health <= 8
        ){

            return CombatAction.HEAL;

        }




        // creeper blízko = útek

        if(

            enemyName === "creeper"

            &&

            distance < 5

        ){

            return CombatAction.ESCAPE;

        }





        // ak je nepriateľ blízko

        if(

            enemyName

            &&

            distance <= 4

        ){

            return CombatAction.ATTACK;

        }





        // nepriateľ ďaleko

        if(

            enemyName

            &&

            distance > 4

        ){

            return CombatAction.RETREAT;

        }




        return CombatAction.IDLE;


    }



}
