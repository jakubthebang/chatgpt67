import mineflayer, { Bot } from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";

import config from "../../config.json";

import { CommandManager } from "../commands/CommandManager";
import { TaskManager } from "./TaskManager";
import { AIEngine } from "./AIEngine";
import { EventManager } from "./EventManager";

import { MovementManager } from "../modules/movement/MovementManager";



export class BotManager {


    public bot!: Bot;

    public tasks: TaskManager;

    public ai: AIEngine;

    public events: EventManager;

    public commands!: CommandManager;

    public movement!: MovementManager;





    constructor() {


        this.tasks =
            new TaskManager();



        this.ai =
            new AIEngine(
                this.tasks
            );



        this.events =
            new EventManager();


    }







    async start() {


        this.bot =
            mineflayer.createBot({


                host: config.minecraft.host,


                port: config.minecraft.port,


                username: config.minecraft.username,


                version: config.minecraft.version


            });





        this.bot.loadPlugin(
            pathfinder
        );





        this.movement =
            new MovementManager(
                this.bot
            );





        this.commands =
            new CommandManager(


                this.ai,


                this.tasks,


                this.movement


            );








        this.bot.once(
            "spawn",
            () => {


                console.log(
                    "AI Bot connected!"
                );



                this.bot.chat(
                    "AI Assistant online. Type .help"
                );


            }
        );








        this.bot.on(
            "chat",
            (
                username,
                message
            )=>{


                if(
                    username === this.bot.username
                )
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