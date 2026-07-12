import { CommandParser } from "./CommandParser";


export class NaturalLanguageProcessor {


private parser =
new CommandParser();



process(
input:string
){


const command =
this.parser.parse(
input
);



console.log(
"AI Command:",
command
);



return command;


}



}
