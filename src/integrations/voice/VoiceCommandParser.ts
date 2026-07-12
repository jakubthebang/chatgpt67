export class VoiceCommandParser {



parse(
text:string
){


const input =
text.toLowerCase();



if(
input.includes("diamant")
||
input.includes("ťažiť")
){

return {

command:
"mine",

args:[
"diamond"
]


};


}



if(
input.includes("domov")
||
input.includes("home")
){

return {

command:
"home",

args:[]

};


}



if(
input.includes("zastav")
){

return {

command:
"stop",

args:[]

};


}



return {

command:
"ai",

args:[
text
]

};


}



}