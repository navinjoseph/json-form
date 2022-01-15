import { IButton } from '../interface/IButton'
import SubmitButton from '../../template/submitbtn.handlebars'
import AbstractTemplate from '../../render/AbstractTemplate'
import IEvent from '../../Event/IEvent'
import Event from '../../Event/Event'

export default class Btn extends AbstractTemplate implements IButton {
  FieldType?: string | undefined
  id: string = "";
  className?: string | undefined
  name?: string | undefined
  label: string = "";
  event: [IEvent] = [{ id: "", event: 'click', callbackfn: "" }]
  disable?: boolean | undefined
  formValue: [] = []
  template: any

  constructor(params: IButton | any) {
    super(params)
  }


  setTemplate() {
    this.template = SubmitButton
  }


  setParam(param: IButton) {
    this.transformedParams = [
      {
        Fieldtype: param.FieldType,
        id: param.id,
        className: param.className,
        label: param.label,
        event: param.event,
      },
    ]
  }

  onSubmit() {
    //call the validator

    // this.submit()
  }
}
