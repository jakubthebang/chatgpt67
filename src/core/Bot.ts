import mineflayer, { Bot } from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";

import config from "../../config.json";

import { CommandManager } from "../commands/CommandManager";
import { TaskManager } from "./TaskManager";
import { AIEngine } from "./AIEngine";
import { EventManager } from "./EventManager";

export class BotManager {

    public bot!: Bot;

    public tasks: TaskManager;
    public ai: AIEngine;
    public events: EventManager;
    public commands: CommandManager;


    constructor() {

        this.tasks = new TaskManager();
        this.ai = new AIEngine(this.tasks);
        this.events = new EventManager();

        this.commands = new CommandManager(
            this.ai,
            this.tasks
        );
    }


    async start() {

        this.bot = mineflayer.createBot({
            host: config.minecraft.host,
            port: config.minecraft.port,
            username: config.minecraft.username,
            version: config.minecraft.version
        });


        this.bot.loadPlugin(pathfinder);


        this.bot.once("spawn", () => {

            console.log(
                "AI Bot connected!"
            );

            this.bot.chat(
                "AI Assistant online. Type .help"
            );

        });


        this.bot.on(
            "chat",
            (username,message)=>{

                if(username === this.bot.username)
                    return;


                this.commands.handle(
                    this.bot,
                    username,
                    message
                );

            }
        );


        this.bot.on(
            "end",
            ()=>{

                console.log(
                    "Disconnected. Reconnecting..."
                );

                setTimeout(()=>{
                    this.start();
                },5000);

            }
        );
    }
}
