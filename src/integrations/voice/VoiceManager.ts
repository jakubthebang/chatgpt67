import { SpeechToText } from "./SpeechToText";
import { VoiceCommandParser } from "./VoiceCommandParser";


export class VoiceManager {


private speech:
SpeechToText;


private parser:
VoiceCommandParser;



constructor(){


this.speech =
new SpeechToText();



this.parser =
new VoiceCommandParser();


}



async processAudio(
audio:any
){


const text =
await this.speech.convert(
audio
);



const command =
this.parser.parse(
text
);



return command;


}



}