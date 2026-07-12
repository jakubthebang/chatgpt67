import {
Client,
GatewayIntentBits
} from "discord.js";


import { DiscordCommands } from "./DiscordCommands";


export class DiscordBot {


private client:Client;



constructor(
private token:string
){


this.client =
new Client({

intents:[

GatewayIntentBits.Guilds,

GatewayIntentBits.GuildMessages,

GatewayIntentBits.MessageContent

]

});


}



start(){


this.client.once(
"ready",
()=>{


console.log(
"Discord AI Bot Online"
);


}
);



this.client.on(
"messageCreate",
message=>{


if(
message.author.bot
)
return;



DiscordCommands.handle(
message
);



}
);



this.client.login(
this.token
);



}



getClient(){

return this.client;

}


}
