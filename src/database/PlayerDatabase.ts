import { Database } from "./Database";


export class PlayerDatabase {


constructor(
private db:Database
){}



savePlayer(
name:string,
data:any
){


this.db.set(
`player_${name}`,
data
);


}



getPlayer(
name:string
){


return this.db.get(
`player_${name}`
);


}



}