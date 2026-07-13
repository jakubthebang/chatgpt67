import { Bot } from "mineflayer";


export class JumpController {


    private bot: Bot;


    constructor(bot: Bot){

        this.bot = bot;

        this.start();

    }



    private start(){


        this.bot.on(
            "physicsTick",
            ()=>{


                const block =
                    this.bot.blockAtCursor(2);



                const velocity =
                    this.bot.entity.velocity;



                if(!block)
                    return;



                const front =
                    this.bot.entity.position
                        .offset(
                            0,
                            0,
                            0
                        );



                const y =
                    this.bot.entity.position.y;



                // ak je pred botom blok vo výške nôh
                // a bot ide dopredu -> vyskoč

                if(
                    block.position.y >= y - 1 &&
                    velocity.x !== 0 ||
                    velocity.z !== 0
                ){

                    this.bot.setControlState(
                        "jump",
                        true
                    );


                    setTimeout(()=>{


                        this.bot.setControlState(
                            "jump",
                            false
                        );


                    },300);


                }


            }

        );


    }


}
