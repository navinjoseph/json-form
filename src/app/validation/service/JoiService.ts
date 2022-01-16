import IValidationService from "./IValidationservice";
import Joi from "joi";
export default class JoiService implements IValidationService {    
     public joi: Joi.Root = Joi;

    constructor () {
        this.joi = Joi;
    }


    public getService() {
        return this.joi;
    }

    public validate(value: any, schema: any): any { 
        Joi.valid()
        //return Joi.validate(value, schema);
       // return schema.validate(data);
    }

    public compile(defenition: any): any {   
        return Joi.compile(defenition);
    }

    public isValidSchema(schema: any): boolean {
        return Joi.isSchema(schema);
    }
}