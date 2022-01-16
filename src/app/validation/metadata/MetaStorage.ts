import { getGlobal } from '../../utils/getGlobal';
import { ValidationSchema } from '../schema/ValidationSchema';
import { ValidationArguments } from '../ValidationArguments';
import { ValidationMessage } from '../ValidationMessage';
import ImetaStorage from './ImetaStorage';

export class MetadataStorage implements ImetaStorage {
  // -------------------------------------------------------------------------
  // Private properties
  // -------------------------------------------------------------------------

  private validationSchema: ValidationArguments[] = []
  private vaidationMessage: ValidationMessage[] = [];
  private constraintMetadatas: any[] = []


  get hasValidationMetaData(): boolean {    
    return !!this.validationSchema.length;
  }

  get validationschema(): ValidationArguments[] {
    return this.validationSchema;
  }

  get validationMessages(): ValidationMessage[] {
    return this.vaidationMessage;
  }

  /**
   * Adds a new validation metadata.
   */
  addValidationSchema(schema: any): void {
    this.validationSchema.push(schema)
  }

  /**
   * Adds a new validation metadata.
   * ValidationMetadata
   */
  addValidationMetadata(metadata: any): void {
    this.validationSchema.push(metadata)
  }

  rebuildErrorMessage() : void{
    this.vaidationMessage = [];
  }

  addMessgeMetaData(data: ValidationMessage) {
    //replace the message if the name is same.
    const index = this.vaidationMessage.findIndex(x => x.name === data.name)
    if (index > -1) {
      this.vaidationMessage[index] = data
    } else {
      this.vaidationMessage.push(data)
    }
  }

  getMetadataStorage(): MetadataStorage {
    const global: any = getGlobal()

    if (!global.classValidatorMetadataStorage) {
      global.classValidatorMetadataStorage = new MetadataStorage()
    }

    return global.classValidatorMetadataStorage
  }
}
