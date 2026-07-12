import { Bot } from "mineflayer";


export class MaterialChecker {


constructor(
private bot:Bot
){}



has(
item:string,
amount:number
){


const count =
this.bot.inventory.items()

.filter(
i=>i.name.includes(item)
)

.reduce(
(a,b)=>a+b.count,
0
);



return count >= amount;


}



missing(
items:string[]
){


return items.filter(
item=>
!this.has(item,1)
);


}



}