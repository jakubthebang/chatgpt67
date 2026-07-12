import fs from "fs";


export class FileLogger {


constructor(
private file:string
){}



write(
message:string
){


fs.appendFileSync(

this.file,

message + "\n"

);


}



clear(){

fs.writeFileSync(
this.file,
""
);


}



}