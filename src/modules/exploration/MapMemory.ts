export class MapMemory {


private biomes:string[]=[];

private structures:string[]=[];



rememberBiome(
biome:string
){

this.biomes.push(
biome
);

}



rememberStructure(
structure:string
){

this.structures.push(
structure
);

}



getBiomes(){

return this.biomes;

}



getStructures(){

return this.structures;

}



clear(){

this.biomes=[];

this.structures=[];

}


}
