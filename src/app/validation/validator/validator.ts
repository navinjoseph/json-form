import { IData } from "../../Data/IData";
import { getGlobal } from "../../utils/getGlobal";
import { MetadataStorage } from "../metadata/MetaStorage";
import IValidator from "./IValidator";

interface IError {
    message: string;
    name: string;
}
export class Validator implements IValidator {
    values: IData;
    metaStorage: MetadataStorage;
    errors: Array<IError> = [];

    constructor(value: any) {
        this.values = value;
        this.metaStorage = new MetadataStorage().getMetadataStorage();
        this.metaStorage.rebuildErrorMessage();
        this.errors = this.metaStorage.validationMessages;
    }

    //TODO: make it async
    validate(args?: any) {
        if (this.metaStorage.hasValidationMetaData) {
            for (let def of this.metaStorage.validationschema) {
                const value = this.values.get(def.targetName);
                const args: any = def
                this.excecute(def, value, args);
            }
        }

        return this.errors.length > 0 ? this.errors : true;
    }


    //TODO: make it async
    excecute(def: any, value: any, args: any) {
        if (!def.validator.validate(value, args)) { 
            const message = typeof def.validator.defaultMessage === 'function' ? def.validator.defaultMessage(value, args) : def.validator.defaultMessage;
            this.metaStorage.addMessgeMetaData({ message: message, name: def.targetName });
        }
    }
    
    get Error(): IError[] {
        return this.errors;
    }

    get hasError() {
        return this.errors.length > 0;
    }


    private clearErrors(findErrorElements: HTMLCollectionOf<Element>) {
        for(let i = 0; i < findErrorElements.length; i++) {
            findErrorElements[i].replaceChildren();
        }
    }

    private attachErrorToElement(Element: HTMLCollectionOf<Element>, NewchildElement: Element, message: string): void  { 
        Element[0].appendChild(NewchildElement).append(document.createTextNode(message))
    }

    buildError(errors: IError[]): void {
        // @ts-ignore: Cannot find name 'window'.

        var DOM: Document = getGlobal().document;
        
        if (DOM === undefined) {
            throw new Error("BuildMessageError: No DOM instance found")
        }

        let findErrorElements : HTMLCollectionOf<Element> = DOM.getElementsByClassName("all-errors");

        this.clearErrors(findErrorElements);
         
        errors.forEach((error: IError) => {
            const className = `${error.name}-error`;
            const Element: HTMLCollectionOf<Element> = DOM.getElementsByClassName(className);
            const NewchildElement = document.createElement('li');
            const message = error.message;
            this.attachErrorToElement(Element, NewchildElement, message);
        });



    }

}