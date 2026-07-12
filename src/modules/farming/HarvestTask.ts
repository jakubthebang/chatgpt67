export interface HarvestTask {


type:
"harvest";


crop:string;


amount:number;


status:
"waiting" |
"running" |
"completed" |
"failed";


}
