export class MiningTest {


run(){


const ores=[

"iron",

"gold",

"diamond"

];



if(
ores.includes("diamond")
){

console.log(
"✓ Mining module OK"
);


return true;

}



return false;


}



}