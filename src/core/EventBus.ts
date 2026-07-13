import { EventEmitter } from "events";

export class EventBus extends EventEmitter {

    emitEvent(
        event: string,
        data?: any
    ) {
        this.emit(event, data);
    }

    onEvent(
        event: string,
        callback: (data: any) => void
    ) {
        this.on(event, callback);
    }

}
