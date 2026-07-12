import { Bot } from "mineflayer";


export class EnemyDetector {


private hostile = [

"zombie",
"skeleton",
"creeper",
"spider",
"enderman",
"witch",
"phantom"

];



constructor(
private bot:Bot
){}



find(
name:string
){


return Object.values(
this.bot.entities
)
.find(entity=>{

return entity.name === name;

});


}



nearest(
radius:number
){


return Object.values(
this.bot.entities
)
.filter(entity=>{


return this.hostile.includes(
entity.name || ""
)
&&
this.bot.entity.position.distanceTo(
entity.position
)<=radius;


})
.sort(
(a,b)=>{


const da =
this.bot.entity.position.distanceTo(
a.position
);


const db =
this.bot.entity.position.distanceTo(
b.position
);



return da-db;


}
)[0];

}


}
