import { Bot } from "mineflayer";


export class ThoughtLogger {


    private bot: Bot;


    private enabled = true;


    private lastMessage = "";

    private lastTime = 0;


    private cooldown = 2000;



    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }





    think(
        message:string
    ){


        if(!this.enabled)
            return;



        const now =
            Date.now();



        if(

            message === this.lastMessage &&

            now - this.lastTime < this.cooldown

        ){

            return;

        }





        this.bot.chat(
            `[AI] ${message}`
        );



        this.lastMessage = message;

        this.lastTime = now;



    }







    enable(){

        this.enabled = true;

    }




    disable(){

        this.enabled = false;

    }


}
