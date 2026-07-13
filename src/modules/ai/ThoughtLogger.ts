import { Bot } from "mineflayer";


export class ThoughtLogger {


    private bot: Bot;


    private enabled = true;


    private lastMessage = "";

    private lastTime = 0;


    // minimálny čas medzi rovnakými správami
    private cooldown = 5000;



    // ochrana proti spamu
    private messagesThisMinute = 0;

    private resetTimer?: NodeJS.Timeout;





    constructor(
        bot: Bot
    ){

        this.bot = bot;



        this.resetTimer =
            setInterval(()=>{


                this.messagesThisMinute = 0;


            },60000);


    }








    think(
        message:string
    ){


        if(!this.enabled)
            return;





        /*
            AI vypisuje iba dôležité udalosti
        */


        const important =

            message.includes("prekážka") ||

            message.includes("skok") ||

            message.includes("cúvam") ||

            message.includes("smer") ||

            message.includes("Stratil") ||

            message.includes("stratil") ||

            message.includes("hľadám") ||

            message.includes("Hľadám") ||

            message.includes("sprintujem") ||

            message.includes("sprint");





        if(!important)
            return;







        const now =
            Date.now();







        if(

            message === this.lastMessage &&

            now - this.lastTime < this.cooldown

        ){

            return;

        }







        // maximálne 8 AI správ za minútu

        if(
            this.messagesThisMinute >= 8
        ){

            return;

        }







        this.bot.chat(

            `[AI] ${message}`

        );







        this.messagesThisMinute++;



        this.lastMessage = message;


        this.lastTime = now;



    }









    enable(){

        this.enabled = true;

    }







    disable(){

        this.enabled = false;

    }







    stop(){


        if(this.resetTimer){


            clearInterval(
                this.resetTimer
            );


            this.resetTimer = undefined;


        }


    }



}