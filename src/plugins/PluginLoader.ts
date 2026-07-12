import { Plugin } from "./Plugin";


export class PluginLoader {


private registry:
Map<string,Plugin> =
new Map();



register(
plugin:Plugin
){

this.registry.set(
plugin.name,
plugin
);

}



get(
name:string
){

return this.registry.get(
name
);

}



list(){

return Array.from(
this.registry.values()
);

}



}
