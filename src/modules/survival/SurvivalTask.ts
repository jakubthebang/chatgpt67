export interface SurvivalTask {


type:

"eat" |
"sleep" |
"escape" |
"equip" |
"heal";



priority:number;



status:

"waiting" |
"running" |
"completed" |
"failed";



}