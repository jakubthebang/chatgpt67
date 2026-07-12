import fs from "fs";


export class MemoryStorage {


constructor(
private file:string
){}



save(
data:any
){


fs.writeFileSync(

this.file,

JSON.stringify(
data,
null,
2
)

);


}



load(){


if(
!fs.existsSync(
this.file
)
){

return {};

}



return JSON.parse(

fs.readFileSync(
this.file,
"utf8"
)

);


}



}