import mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import dotenv from "dotenv";

dotenv.config();

const bot = mineflayer.createBot({
    host: process.env.MC_HOST!,
    port: Number(process.env.MC_PORT),
    username: process.env.MC_USERNAME!,
    version: process.env.MC_VERSION!
});

bot.loadPlugin(pathfinder);

bot.once("spawn", () => {
    console.log("================================");
    console.log("Minecraft AI Bot");
    console.log("Connected successfully!");
    console.log("================================");

    bot.chat("Hello! Type .help");
});

bot.on("chat", (username, message) => {
    if (username === bot.username) return;

    if (!message.startsWith(".")) return;

    const args = message.substring(1).split(" ");

    const command = args.shift()?.toLowerCase();

    switch (command) {
        case "help":
            bot.chat("Commands: .help .status");
            break;

        case "status":
            bot.chat(
                `❤ ${bot.health} | 🍗 ${bot.food} | X:${Math.floor(bot.entity.position.x)} Y:${Math.floor(bot.entity.position.y)} Z:${Math.floor(bot.entity.position.z)}`
            );
            break;

        default:
            bot.chat("Unknown command.");
    }
});

bot.on("end", () => {
    console.log("Disconnected.");
});

bot.on("error", (err) => {
    console.error(err);
});
