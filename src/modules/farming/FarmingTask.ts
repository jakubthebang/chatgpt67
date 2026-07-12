export interface FarmingTask {


type:

"plant" |
"harvest" |
"collect_seeds" |
"expand_farm";



crop:string;


amount:number;



status:

"waiting" |
"working" |
"completed" |
"failed";



}