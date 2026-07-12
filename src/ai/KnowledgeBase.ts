export class KnowledgeBase {


private data =
new Map<string,any>();



set(
key:string,
value:any
){

this.data.set(
key,
value
);

}



get(
key:string
){

return this.data.get(
key
);

}



has(
key:string
){

return this.data.has(
key
);

}



remove(
key:string
){

this.data.delete(
key
);

}



clear(){

this.data.clear();

}


}
