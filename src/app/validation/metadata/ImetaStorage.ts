import { MetadataStorage } from "./MetaStorage";

export default interface ImetaStorage  {
        getMetadataStorage(): MetadataStorage
        
        addValidationSchema(schema: any) : any

        addValidationMetadata(metadata: any) : any;
}



