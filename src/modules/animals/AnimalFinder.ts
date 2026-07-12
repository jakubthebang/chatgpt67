import { Bot } from "mineflayer";


export class AnimalFinder {


constructor(
private bot:Bot
){}



find(
type:string
){


return this.bot.entities
&& Object.values(
this.bot.entities
)
.filter(entity=>{


return (
entity.name === type
);


});


}



nearest(
type:string
){


const animals =
this.find(type);


if(!animals.length)
return null;



return animals.sort(
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
