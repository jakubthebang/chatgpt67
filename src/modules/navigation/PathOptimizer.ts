export class PathOptimizer {



optimize(
path:any[]
){


return path.filter(
(point,index)=>

index % 2 === 0

);


}



}