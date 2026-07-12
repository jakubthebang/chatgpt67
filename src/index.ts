import { BotManager } from "./core/Bot";
import { Logger } from "./utils/Logger";


const logger = new Logger();


async function main(){

    logger.info("Starting Minecraft AI Bot...");


    const bot = new BotManager();


    await bot.start();

}


main().catch(error => {

    logger.error(error);

});
