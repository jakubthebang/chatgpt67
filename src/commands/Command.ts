import { Bot } from "mineflayer";

export interface Command {

    name: string;

    description: string;

    execute(
        bot: Bot,
        args: string[]
    ): void;

}
