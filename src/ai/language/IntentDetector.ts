export type Intent =

"mine" |
"farm" |
"follow" |
"goto" |
"stop" |
"status" |
"unknown";



export class IntentDetector {


detect(
text:string
):Intent{


const input =
text.toLowerCase();



if(
input.includes("mine") ||
input.includes("ťaž") ||
input.includes("diamond")
){

return "mine";

}



if(
input.includes("farm") ||
input.includes("farma")
){

return "farm";

}



if(
input.includes("follow") ||
input.includes("nasleduj")
){

return "follow";

}



if(
input.includes("stop") ||
input.includes("zastav")
){

return "stop";

}



if(
input.includes("status") ||
input.includes("stav")
){

return "status";

}



return "unknown";


}



}
