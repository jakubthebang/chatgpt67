import { Bot } from "mineflayer";


export class JumpRecoveryAI {


    private bot: Bot;


    private recovering = false;


    constructor(
        bot: Bot
    ){

        this.bot = bot;

    }





    async recover(){


        if(this.recovering)
            return;


        this.recovering = true;



        console.log(
            "[AI] Jump failed. Recalculating..."
        );



        // malý návrat od prekážky

        this.bot.clearControlStates();



        this.bot.setControlState(

            "back",

            true

        );



        await this.wait(350);



        this.bot.setControlState(

            "back",

            false

        );





        // druhý pokus skoku


        this.bot.setControlState(

            "forward",

            true

        );



        await this.wait(100);



        this.bot.setControlState(

            "jump",

            true

        );



        await this.wait(200);



        this.bot.setControlState(

            "jump",

            false

        );





        await this.wait(500);





        this.bot.clearControlStates();



        this.recovering = false;



    }





    private wait(
        ms:number
    ){

        return new Promise(

            resolve =>

                setTimeout(resolve,ms)

        );

    }



}
