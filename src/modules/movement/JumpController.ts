import { Bot } from "mineflayer";
import { Vec3 } from "vec3";

export class JumpController {
    private bot: Bot;
    private interval?: NodeJS.Timeout;

    constructor(bot: Bot) {
        this.bot = bot;
    }

    start() {
        this.interval = setInterval(() => {
            this.checkAutoJump();
        }, 100);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    private checkAutoJump() {
        const bot = this.bot;

        if (!bot.entity) return;

        const pos = bot.entity.position;

        // blok pred botom
        const forward = bot.entity.yaw;

        const x = Math.floor(pos.x - Math.sin(forward));
        const y = Math.floor(pos.y);
        const z = Math.floor(pos.z + Math.cos(forward));

        const block = bot.blockAt(new Vec3(x, y, z));
        const above = bot.blockAt(new Vec3(x, y + 1, z));

        if (!block || !above) return;

        // 1 block prekážka + miesto nad ňou voľné
        if (
            block.boundingBox === "block" &&
            above.boundingBox === "empty"
        ) {
            bot.setControlState("jump", true);

            setTimeout(() => {
                bot.setControlState("jump", false);
            }, 250);
        }
    }
}