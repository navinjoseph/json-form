import EventStorage from "../EventStorage";

export interface IEventMetaStorage {
    getMetadataStorage(): EventStorage
        
    addEventSchema(schema: any) : any

}