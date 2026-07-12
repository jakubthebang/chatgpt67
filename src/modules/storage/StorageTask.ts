export interface StorageTask {


type:
"deposit" |
"withdraw";


item?:string;


amount?:number;


status:
"waiting" |
"running" |
"completed" |
"failed";


}
