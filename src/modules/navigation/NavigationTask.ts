export interface NavigationTask {


type:
"goto" |
"home" |
"waypoint";


target:string;


status:
"waiting" |
"running" |
"completed" |
"failed";


}
