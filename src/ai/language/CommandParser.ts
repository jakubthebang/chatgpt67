import { IntentDetector } from "./IntentDetector";


export interface ParsedCommand {


intent:string;


target?:string;


args:string[];


}



export class CommandParser {


private detector =
new IntentDetector();



parse(
text:string
):ParsedCommand{


const intent =
this.detector.detect(
text
);



const words =
text.split(" ");



return {


intent,


target:
words[1],


args:
words.slice(1)


};



}



}
