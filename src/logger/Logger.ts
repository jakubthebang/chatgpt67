import { LogLevel } from "./LogLevel";
import { FileLogger } from "./FileLogger";


export class Logger {


private fileLogger:FileLogger;



constructor(
file:string
){

this.fileLogger =
new FileLogger(file);

}



log(
level:LogLevel,
message:string
){


const text =

`[${new Date().toISOString()}] [${level}] ${message}`;



console.log(
text
);



this.fileLogger.write(
text
);



}



info(
message:string
){

this.log(
LogLevel.INFO,
message
);

}



warn(
message:string
){

this.log(
LogLevel.WARN,
message
);

}



error(
message:string
){

this.log(
LogLevel.ERROR,
message
);

}



debug(
message:string
){

this.log(
LogLevel.DEBUG,
message
);

}



}