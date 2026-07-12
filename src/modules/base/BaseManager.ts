import { Bot } from "mineflayer";
import { HomeLocation } from "./HomeLocation";
import { ChestScanner } from "./ChestScanner";
import { StorageManager } from "./StorageManager";


export class BaseManager {


private home:HomeLocation;

private chests:ChestScanner;

private storage:StorageManager;



constructor(
private bot:Bot
){


this.home =
new HomeLocation();


this.chests =
new ChestScanner();


this.storage =
new StorageManager();


}



setHome(){

this.home.set(
this.bot.entity.position
);


this.bot.chat(
"Home saved"
);


}



getHome(){

return this.home.get();

}



scanStorage(){

return this.chests.findChests();

}



status(){


return {

home:
this.home.exists(),


chests:
this.scanStorage().length,


items:
this.storage.getItems().length


};


}



}