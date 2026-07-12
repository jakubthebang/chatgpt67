export interface BlockData {


x:number;

y:number;

z:number;

block:string;


}



export class BlueprintLoader {


private blueprints =
new Map<string,BlockData[]>();



constructor(){


this.blueprints.set(
"wall",
[

{
x:0,
y:0,
z:0,
block:"stone"
},

{
x:0,
y:1,
z:0,
block:"stone"
},

{
x:0,
y:2,
z:0,
block:"stone"
}

]

);


}



load(
name:string
){


return this.blueprints.get(
name
);


}



add(
name:string,
data:BlockData[]
){

this.blueprints.set(
name,
data
);

}



}
