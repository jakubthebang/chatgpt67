export class MigrationSystem {


private migrations:
Map<number,Function> =
new Map();



add(
version:number,
callback:Function
){

this.migrations.set(
version,
callback
);


}



run(
current:number
){


for(
const [
version,
migration
]
of this.migrations
){


if(
version > current
){

migration();

}


}


}



}