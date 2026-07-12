import express from "express";
import { ApiRouter } from "./ApiRouter";


export class WebServer {


private app = express();



constructor(
private port:number
){}



start(){


this.app.use(
express.json()
);


this.app.use(
"/api",
ApiRouter.router
);


this.app.use(
express.static(
"web"
)
);



this.app.listen(
this.port,
()=>{

console.log(
`Dashboard running on ${this.port}`
);

}

);


}



}
