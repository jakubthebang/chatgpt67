export class EventManager {


private events = new Map();


on(event:string,callback:any){

    this.events.set(
        event,
        callback
    );

}


emit(event:string,data:any){

    const callback =
    this.events.get(event);


    if(callback)
        callback(data);

}


}
