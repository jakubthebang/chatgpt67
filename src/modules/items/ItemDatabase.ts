export class ItemDatabase {


private items =
new Map<string,any>();



add(
name:string,
data:any
){

this.items.set(
name,
data
);


}



get(
name:string
){

return this.items.get(
name
);

}



exists(
name:string
){

return this.items.has(
name
);

}



list(){

return Array.from(
this.items.keys()
);

}



}