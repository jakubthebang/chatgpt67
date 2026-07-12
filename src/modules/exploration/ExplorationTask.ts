export interface ExplorationTask {


type:
"explore";


target?:
string;



distance:number;



status:
"waiting" |
"running" |
"completed" |
"failed";


}
