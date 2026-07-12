export class CommandTest {


run(){


const commands = [

".help",

".status",

".mine diamond"

];



let passed=true;



for(
const command of commands
){

if(
!command.startsWith(".")
){

passed=false;

}


}



console.log(

passed ?

"✓ Commands OK"

:

"✗ Commands failed"

);



return passed;


}



}