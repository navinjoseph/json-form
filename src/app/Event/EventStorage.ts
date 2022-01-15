import { getGlobal } from '../utils/getGlobal';
import { IEventMetaStorage } from "./Meta/IEventMetaStorage";

class EventStorage implements IEventMetaStorage{

    private EventSchema: any[] = []

    get eventSchema() {
      return this.EventSchema;
    }


    addEventSchema(schema: any) {
        this.EventSchema.push(schema)
    }

    getMetadataStorage(): EventStorage {
        const global: any = getGlobal()
    
        if (!global.eventMetadataStorage) {
          global.eventMetadataStorage = new EventStorage()
        }
    
        return global.eventMetadataStorage
      }

}


export default EventStorage;