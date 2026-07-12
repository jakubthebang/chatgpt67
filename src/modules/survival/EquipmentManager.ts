import { Bot } from "mineflayer";


export class EquipmentManager {


constructor(
private bot:Bot
){}



getArmor(){


return this.bot.inventory.items()
.filter(
item =>
item.name.includes("helmet") ||
item.name.includes("chestplate") ||
item.name.includes("leggings") ||
item.name.includes("boots")
);


}



}