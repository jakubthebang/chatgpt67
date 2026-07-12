import { RecipeDatabase } from "./RecipeDatabase";


export class CraftPlanner {


constructor(
private recipes:RecipeDatabase
){}



plan(
item:string
){


if(
!this.recipes.exists(item)
){

return null;

}



return {

goal:item,


materials:
this.recipes.get(item)



};



}



}