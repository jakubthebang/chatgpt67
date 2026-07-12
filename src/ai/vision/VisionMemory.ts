export class VisionMemory {


private scans:any[]=[];



save(
data:any
){

this.scans.push(
data
);

}



last(){

return this.scans[
this.scans.length-1
];

}



clear(){

this.scans=[];

}



}