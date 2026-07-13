import { Bot } from "mineflayer";


export class JumpRecoveryAI {


    private bot: Bot;


    private recovering = false;


    private attempts = 0;


    private onFailed?: () => void;



    constructor(

        bot: Bot,

        onFailed?: () => void

    ){

        this.bot = bot;

        this.onFailed = onFailed;

    }









    async recover(){



        if(this.recovering)
            return;



        this.recovering = true;


        this.attempts++;





        console.log(
            "[AI] Jump recovery started"
        );





        // iba jeden opravný pokus

        if(this.attempts > 1){



            console.log(
                "[AI] Jump impossible. Changing path..."
            );



            this.recovering = false;


            this.attempts = 0;



            if(this.onFailed){

                this.onFailed();

            }



            return;

        }






        this.bot.clearControlStates();






        // cúvnutie

        this.bot.setControlState(

            "back",

            true

        );



        await this.wait(400);




        this.bot.setControlState(

            "back",

            false

        );







        await this.wait(200);







        // nový pokus



        this.bot.setControlState(

            "forward",

            true

        );



        await this.wait(100);




        this.bot.setControlState(

            "jump",

            true

        );




        await this.wait(180);




        this.bot.setControlState(

            "jump",

            false

        );




        this.bot.setControlState(

            "forward",

            false

        );





        await this.wait(800);





        this.recovering = false;



    }









    reset(){


        this.attempts = 0;


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