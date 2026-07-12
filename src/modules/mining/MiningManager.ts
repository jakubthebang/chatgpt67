import { Bot } from "mineflayer";
import { OreFinder } from "./OreFinder";
import { ToolManager } from "./ToolManager";


export class MiningManager {

    private finder: OreFinder;
    private tools: ToolManager;


    constructor(
        private bot: Bot
    ){

        this.finder = new OreFinder(bot);
        this.tools = new ToolManager(bot);

    }



    async mine(
        ore:string
    ){

        this.bot.chat(
            `Searching for ${ore}`
        );


        const block =
        await this.finder.findOre(
            ore
        );


        if(!block){

            this.bot.chat(
                `No ${ore} found nearby`
            );

            return;

        }


        await this.tools.selectTool(
            block
        );


        await this.bot.dig(
            block
        );


        this.bot.chat(
            `${ore} mined!`
        );


    }


}
