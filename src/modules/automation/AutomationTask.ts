export interface AutomationTask {


id:string;


type:string;


priority:number;


data:any;



status:

"waiting" |
"running" |
"completed" |
"failed";



}