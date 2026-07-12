export class AnimalMemory {


private animals:string[] = [];



remember(
animal:string
){

this.animals.push(
animal
);

}



getAnimals(){

return this.animals;

}



clear(){

this.animals=[];

}


}
