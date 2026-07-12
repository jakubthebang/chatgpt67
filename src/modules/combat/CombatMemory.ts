export class CombatMemory {


private enemies:string[] = [];



remember(
enemy:string
){

this.enemies.push(
enemy
);

}



getHistory(){

return this.enemies;

}



clear(){

this.enemies=[];

}


}
