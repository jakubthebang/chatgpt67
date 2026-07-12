import { Bot } from "mineflayer";
import { EnemyDetector } from "./EnemyDetector";
import { DefenseSystem } from "./DefenseSystem";
import { CombatMemory } from "./CombatMemory";


export class CombatManager {


private detector: EnemyDetector;
private defense: DefenseSystem;
private memory: CombatMemory;



constructor(
    private bot: Bot
){

    this.detector =
        new EnemyDetector(bot);


    this.defense =
        new DefenseSystem(bot);


    this.memory =
        new CombatMemory();

}



attack(
target:string
){


const enemy =
this.detector.find(target);



if(!enemy){

this.bot.chat(
`No ${target} nearby`
);

return;

}



this.bot.attack(
    enemy
);



this.memory.remember(
    target
);



this.bot.chat(
`Attacking ${target}`
);



}



guard(radius:number = 10){


const enemy =
this.detector.nearest(
    radius
);



if(enemy){

this.bot.attack(
    enemy
);

}


}



defend(){

this.defense.enable();

}


}
