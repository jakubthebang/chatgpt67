export class RouteMemory {


private routes:any[]=[];



save(
from:any,
to:any,
path:any[]
){


this.routes.push({

from,

to,

path

});


}



find(
from:any,
to:any
){


return this.routes.find(
route =>
route.from===from &&
route.to===to
);


}



clear(){

this.routes=[];

}



}