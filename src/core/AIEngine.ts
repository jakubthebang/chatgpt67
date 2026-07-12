import { TaskManager } from "./TaskManager";


export class AIEngine {


constructor(
    private tasks:TaskManager
){}



process(input:string){

    console.log(
        "AI received:",
        input
    );


    if(input.includes("follow")){

        return "follow";

    }


    return null;

}


}
