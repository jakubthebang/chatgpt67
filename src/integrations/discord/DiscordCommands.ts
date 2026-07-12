export class DiscordCommands {


static handle(
message:any
){


const content =
message.content;



if(
!content.startsWith("!")
)
return;



const args =
content
.substring(1)
.split(" ");



const command =
args.shift();



switch(command){


case "help":


message.reply(
`
Minecraft AI Commands:

!status

!stop

!follow <player>

!mine <ore>
`
);


break;



case "status":


message.reply(
"Getting bot status..."
);


break;



case "stop":


message.reply(
"Stopping tasks..."
);


break;



default:


message.reply(
"Unknown command"
);


}



}



}
