export interface AttackTask {


type:
"attack";


target:string;


weapon?:string;


status:
"waiting" |
"running" |
"completed" |
"failed";


}
