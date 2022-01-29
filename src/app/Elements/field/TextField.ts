import TextInput from '../../template/text.handlebars'
import TextArea from '../../template/textarea.handlebars';
import { IElementFieldArttibutes } from '../interface/IElementArttibutes'
import { ValidationSchema } from '../../validation/schema/ValidationSchema'
import { MetadataStorage } from '../../validation/metadata/MetaStorage'
import ValidatorFactory from '../../factory/ValidatorFactory'
import AbstractTemplate from '../../render/AbstractTemplate'
import { ValidationArguments } from '../../validation/ValidationArguments'
import { ValidationOptions } from '../../validation/ValidationOptions'
import { ElementType } from '../../enum/ElementEnum';

export class TextField extends AbstractTemplate implements IElementFieldArttibutes {

  Fieldtype?: string
  name: string = ""
  id: string = ''
  className?: string
  value?: string | Object | number | Array<{} | []>
  event: string = ''
  validation: [ValidationSchema] = [{ type: '' }]
  label: string = ''
  min?: number
  max?: number
  placeholder?: string

  constructor(param: IElementFieldArttibutes | any) {
    super(param)
    this.registerSchema(param)
  }

  setTemplate() {        
    if(this.getParams("Fieldtype") === ElementType.TextArea) {
      this.template = TextArea;
    } else {
      this.template = TextInput;
    }
  }


  setParam(param: IElementFieldArttibutes) {
    this.transformedParams = [
      {
        Fieldtype: param.FieldType,
        id: param.id,
        className: param.className,
        name: param.name,
        value: param.value,
        event:param.event,
        placeholder: param.placeholder,
        validation: param.validation,
        label: param.label,
        extraAttr: param.extra,
        min: param.extra?.max,
        max: param.extra?.max,
        error: param?.error,
      },
    ]
  }

  // registerEvent() {
  //   return;
  // }

  registerSchema(param: IElementFieldArttibutes) {
    const MetaStorage = new MetadataStorage().getMetadataStorage()
   
    if(param?.validation === undefined) {
      return;
    }
    //TODO: Make it declarative.
    
    for (const meta of param?.validation) {      
      
      const ValidationArguments: ValidationArguments = {
        type: meta.type,
        constraints: meta.constraints,
        targetName: param.name,
        validatorCallback: meta.validatorCallback,
      }

      const ValidationOptions: ValidationOptions = {
        message: meta.message,
      }
      

      const instance = new ValidatorFactory(ValidationArguments, ValidationOptions)
      MetaStorage.addValidationSchema(instance)
    }
  }

  Validate() { }
}
