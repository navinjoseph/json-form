import EventStorage from "./EventStorage";
import IEvent from "./IEvent";

class Event implements IEvent {
    id: string = "";
    event: string = "";
    callbackfn: any;
    EventParams: [IEvent]

    constructor(id: string, param: [IEvent]) {
        this.id = id
        this.EventParams = param;
    }

    public addEvent() {
        const MetaStorage = new EventStorage().getMetadataStorage()        
        if(this.EventParams !== undefined) {
            for (const Eventmeta of this.EventParams) {
                const EventMeta: IEvent = {
                    id: this.id,
                    event: Eventmeta.event,
                    callbackfn: Eventmeta.callbackfn
                }
    
                MetaStorage.addEventSchema(EventMeta);
            }
        }

    }



}

export default Event;

export function subscribeEvents() {
    const EventSchemaStorage = new EventStorage().getMetadataStorage();

    EventSchemaStorage?.eventSchema?.forEach(event => {
        const name = document.getElementById(event.id);        
        name?.addEventListener(event.event, event.callbackfn);
    });


}