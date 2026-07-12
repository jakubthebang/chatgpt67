export class ItemFilter {


private blacklist:string[] = [

"dirt",

"cobblestone"

];



isTrash(
name:string
){


return this.blacklist.includes(
name
);


}



addTrash(
name:string
){

this.blacklist.push(
name
);

}



removeTrash(
name:string
){

this.blacklist =
this.blacklist.filter(
item=>item!==name
);

}



}