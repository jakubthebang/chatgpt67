export class CommandParser {


parse(
message:string
){


if(
!message.startsWith(".")
){

return null;

}



const parts =
message
.substring(1)
.trim()
.split(" ");



return {


command:
parts.shift()?.toLowerCase(),


args:
parts



};



}



}