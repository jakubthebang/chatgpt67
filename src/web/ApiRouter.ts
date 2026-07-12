import { Router } from "express";
import { BotAPI } from "./BotAPI";


export class ApiRouter {


static router =
Router();



static init(
api:BotAPI
){


this.router.get(
"/status",
(req,res)=>{


res.json(
api.getStatus()
);


}
);



this.router.post(
"/command",
(req,res)=>{


api.command(
req.body.command
);


res.json({

success:true

});


}
);



}



}
