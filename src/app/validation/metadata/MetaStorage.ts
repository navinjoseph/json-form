import { getGlobal } from '../../utils/getGlobal'
import { ValidationSchema } from '../schema/ValidationSchema'
import { ValidationArguments } from '../ValidationArguments'
import ImetaStorage from './ImetaStorage'

export class MetadataStorage implements ImetaStorage {
  // -------------------------------------------------------------------------
  // Private properties
  // -------------------------------------------------------------------------

  private validationSchema: ValidationArguments[] = []
  private constraintMetadatas: any[] = []


  get hasValidationMetaData(): boolean {    
    return !!this.validationSchema.length;
  }

  get validationschema(): ValidationArguments[] {
    return this.validationSchema;
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

  getMetadataStorage(): MetadataStorage {
    const global: any = getGlobal()

    if (!global.classValidatorMetadataStorage) {
      global.classValidatorMetadataStorage = new MetadataStorage()
    }

    return global.classValidatorMetadataStorage
  }
}
