export interface BaseTask {


type:

"return_home" |
"store_items" |
"scan_storage" |
"build_base";



priority:number;



status:

"waiting" |
"running" |
"completed" |
"failed";


}