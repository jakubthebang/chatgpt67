import { Bot } from "mineflayer";


export class SeedManager {


constructor(
private bot:Bot
){}



countSeeds(){


return this.bot.inventory.items()
.filter(
item =>
item.name.includes("seed")
)
.reduce(
(a,b)=>
a+b.count,
0
);



}



hasSeeds(){

return this.countSeeds()>0;

}



}