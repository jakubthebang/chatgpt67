import { Bot } from "mineflayer";
import { Plugin } from "./Plugin";


export class PluginManager {


private plugins:Plugin[]=[];



load(
plugin:Plugin,
bot:Bot
){

this.plugins.push(
plugin
);


plugin.onLoad(
bot
);


console.log(
`Plugin loaded: ${plugin.name}`
);


}



unload(
name:string,
bot:Bot
){


const plugin =
this.plugins.find(
p=>p.name===name
);



if(!plugin)
return;



plugin.onUnload(
bot
);



this.plugins =
this.plugins.filter(
p=>p!==plugin
);


}



getPlugins(){

return this.plugins;

}



}
