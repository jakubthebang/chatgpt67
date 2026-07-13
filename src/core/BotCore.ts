import { Bot } from "mineflayer";
import { ModuleManager } from "./ModuleManager";
import { TaskManager } from "./TaskManager";
import { EventBus } from "./EventBus";

export class BotCore {

    readonly modules =
        new ModuleManager();

    readonly tasks =
        new TaskManager();

    readonly events =
        new EventBus();

    constructor(
        public bot: Bot
    ) {}

    start() {

        console.log(
            "BotCore started."
        );

    }

}
