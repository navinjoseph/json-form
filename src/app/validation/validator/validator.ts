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

        //TODO : make this is as a function and retrive the error form the metaStorage.
        return this.errors.length > 0 ? this.errors : true;
    }


    //TODO: make it async
    excecute(def: any, value: any, args: any) {
        //  console.log(def.validator.validate(value, args));
        if (!def.validator.validate(value, args)) {
            // console.log('Error', def.validator.defaultMessage);


            //if not joi validator get the default message and push to metaStorage.
            this.errors.push({ message: def.validator.defaultMessage, name: def.targetName });

            //TODO : if joi validator get message from the validator and push to metaStorage.


        }
    }

    get Error(): IError[] {
        //TODO: Get the error from metaStorage.
        return this.errors;
    }

    get hasError() {
        //TODO: Get the error from metaStorage.
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