export class ChunkMemory {


private chunks:Set<string> =
new Set();



remember(
chunk:string
){

this.chunks.add(
chunk
);

}



known(
chunk:string
){

return this.chunks.has(
chunk
);

}



list(){

return Array.from(
this.chunks
);

}



clear(){

this.chunks.clear();

}



}