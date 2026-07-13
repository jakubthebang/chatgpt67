import { Bot } from "mineflayer";

export class AutoEat {

    private bot: Bot;

    private interval?: NodeJS.Timeout;

    private eating = false;

    private readonly HUNGER_THRESHOLD = 16;

    constructor(bot: Bot) {
        this.bot = bot;
    }

    public start() {

        this.interval = setInterval(async () => {

            if (this.eating) return;

            if (this.bot.food > this.HUNGER_THRESHOLD) return;

            const food = this.findFood();

            if (!food) return;

            try {

                this.eating = true;

                await this.bot.equip(food, "hand");

                await this.bot.consume();

            } catch (err) {

                console.log("AutoEat:", err);

            } finally {

                this.eating = false;

            }

        }, 1000);

    }

    public stop() {

        if (this.interval)
            clearInterval(this.interval);

    }

    private findFood() {

        const foods = this.bot.inventory.items().filter(item => {

            return item.name.includes("beef")
                || item.name.includes("pork")
                || item.name.includes("chicken")
                || item.name.includes("mutton")
                || item.name.includes("rabbit")
                || item.name.includes("cod")
                || item.name.includes("salmon")
                || item.name.includes("bread")
                || item.name.includes("potato")
                || item.name.includes("carrot")
                || item.name.includes("apple")
                || item.name.includes("melon")
                || item.name.includes("cookie")
                || item.name.includes("pumpkin_pie")
                || item.name.includes("golden_carrot");

        });

        if (foods.length === 0)
            return null;

        return foods[0];

    }

}
