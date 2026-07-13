import { Bot } from "mineflayer";
import { Vec3 } from "vec3";
import { BlockData } from "./BlueprintLoader";


export class Builder {


    constructor(
        private bot: Bot
    ) {}



    async build(
        blocks: BlockData[]
    ) {


        const origin =
            this.bot.entity.position;


        for(
            const block of blocks
        ) {


            const target =
                this.bot.blockAt(
                    origin.offset(
                        block.x,
                        block.y,
                        block.z
                    )
                );



            if(!target)
                continue;



            const item =
                this.bot.inventory.items()
                .find(
                    i => i.name.includes(
                        block.block
                    )
                );



            if(!item)
                continue;



            await this.bot.equip(
                item,
                "hand"
            );



            try {


                await this.bot.placeBlock(
                    target,
                    new Vec3(
                        0,
                        1,
                        0
                    )
                );


            } catch {}

        }


    }


}
