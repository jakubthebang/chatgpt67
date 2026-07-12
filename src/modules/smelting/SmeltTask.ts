export interface SmeltTask {


input:string;


output:string;


amount:number;



status:

"waiting" |
"smelting" |
"completed" |
"failed";



}