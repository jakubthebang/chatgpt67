export class SmeltPlanner {


private recipes:any = {


iron_ingot:
"iron_ore",


gold_ingot:
"gold_ore",


glass:
"sand"



};



plan(
output:string
){


return {


input:
this.recipes[output],


output


};



}



}