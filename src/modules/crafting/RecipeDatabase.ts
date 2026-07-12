export class RecipeDatabase {


private recipes:any = {


wooden_pickaxe:[

"planks",

"stick"

],


stone_pickaxe:[

"cobblestone",

"stick"

],


iron_pickaxe:[

"iron_ingot",

"stick"

],


diamond_pickaxe:[

"diamond",

"stick"

]


};



get(
item:string
){


return this.recipes[item];

}



exists(
item:string
){

return !!this.recipes[item];

}



}