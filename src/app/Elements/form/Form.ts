import IFieldBase from "../interface/IFieldBase";
import { IForm } from "../interface/IFrom";
import IEvent from "../../Event/IEvent";
import AbstractTemplate from "../../render/AbstractTemplate";
import TForm from '../../template/form.handlebars';
import { Validator } from "../../validation/validator/validator";
import FormDataAdapter from "../../Data/FormDataAdapter";




function getFromData(id: HTMLFormElement) {
    const form: HTMLFormElement | any = id;
    if (form !== undefined) {
        const Data = new FormData(form);
        return Data;

    }
    throw new Error("Form not found");
}


export function FromSubmitCallback(e: Event | any, callback: Function) {
    e.preventDefault();

    const FromValue =  getFromData(e?.target);
    const Data = new FormDataAdapter(FromValue)
    const validation = new Validator(Data);
    
    //TODO: make it async
    validation.validate()
    validation.buildError(validation.Error);


    callback(e, validation);
}

export default class Form extends AbstractTemplate implements IForm {

    id?: string;
    className?: string | undefined;
    name?: string | undefined;
    method?: string | undefined;
    event: [IEvent] = [{ id: "", event: "", callbackfn: "" }];
    onSubmit: Function = () => {}

    constructor(param: IForm | any) {
        super(param);
    }

    setTemplate(template: any) {
        this.template = TForm;
    }

    setParam(param: IForm) {
        const defualtonSubmit = this.regsiterDefaultOnSubmitEvent(param);
        this.transformedParams = [
            {
                id: param.id,
                className: param.className,
                name: param.name,
                method: param.method,
                childrenElement: param.childrenElement,
                event:[...defualtonSubmit, ...param.event],
            }
        ]
    }

    regsiterDefaultOnSubmitEvent(param: IForm): [IEvent] {
        return [{
            id: param.id,
            event: 'submit',
            callbackfn: (e: Event) => {
                FromSubmitCallback(e, param.onSubmit);
            }
        }]
    }
}


