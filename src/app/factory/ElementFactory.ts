import { ElementType, ElementForm, ButtonType } from '../enum/ElementEnum'
import IFieldBase from '../Elements/interface/IFieldBase'
import { IElementArttibutes } from '../Elements/interface/IElementArttibutes'
import { TextField } from '../Elements/field/TextField'
import Btn from '../Elements/button/SubmitBtn';
import Form from '../Elements/form/Form';

export default class ElementFactory {
  ElementClass: any[] = [];

  constructor(ElementFactoryParams: IElementArttibutes[]) {
    for (const param of ElementFactoryParams) {
      if (this.checkFieldTypeEixsts(ElementType, param.FieldType)) {
        this.ElementClass.push(new TextField(param))
      } else if (this.checkFieldTypeEixsts( ButtonType, param.FieldType)) {
        this.ElementClass.push(new Btn(param));
      } else if (this.checkFieldTypeEixsts(ElementForm, param.FieldType)) {        
        this.ElementClass.push(new Form(param));
      }

    }
    
  }

  getFieldClass() {
    return this.ElementClass
  }

  private checkFieldTypeEixsts<T>(Type: T, FieldType: any) {      
    // check if field type exists in ElementType enum
    return Object.values(Type).includes(FieldType);

  }
  
}
