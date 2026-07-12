import { MemoryStorage } from "./MemoryStorage";


export class Database {


private storage:
MemoryStorage;



private data:any;



constructor(
file:string
){


this.storage =
new MemoryStorage(
file
);


this.data =
this.storage.load();


}



set(
key:string,
value:any
){

this.data[key]=value;

this.save();

}



get(
key:string
){

return this.data[key];

}



remove(
key:string
){

delete this.data[key];

this.save();

}



save(){

this.storage.save(
this.data
);

}



}