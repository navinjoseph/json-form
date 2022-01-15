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
        console.log('service', schema);
       // return schema.validate(data);
    }

    public compile(defenition: any): any {
        //create a custom compile function.
        // type: 'string',
        // valid: ['key'],
        // pattern: /^[a-zA-Z0-9]+$/,
        // min: 10,
        // max: 20,
        // required: true
        console.log(defenition);
        
        return Joi.compile(defenition);
    }

    public isValidSchema(schema: any): boolean {
        return Joi.isSchema(schema);
    }
}