import { Command } from "../core/Command";


export class CommandRegistry {


private commands:
Map<string,Command>
=
new Map();



register(
command:Command
){

this.commands.set(
command.name,
command
);

}



get(
name:string
){

return this.commands.get(
name
);

}



list(){

return Array.from(
this.commands.values()
);

}



}