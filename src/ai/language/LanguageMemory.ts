export class LanguageMemory {


private history:string[]=[];



add(
message:string
){

this.history.push(
message
);

}



getHistory(){

return this.history;

}



clear(){

this.history=[];

}



}
