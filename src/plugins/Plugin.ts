import { Bot } from "mineflayer";


export interface Plugin {


name:string;


version:string;



description:string;



onLoad(
bot:Bot
):void;



onUnload(
bot:Bot
):void;



}
