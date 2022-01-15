import { ValidationError, ValidationResult } from "joi";
import JoiValidationAdapter from "../adapter/JoiValidationAdapter";
import { ValidationArguments } from "../ValidationArguments";
import { ValidationOptions } from "../ValidationOptions";
import { buildMessage } from "./buildMessage";

export const JOI_VALIDATOR = 'Joi';


export function JoiValidator(ValidationArgument: ValidationArguments, validationOptions?: ValidationOptions)  {
    //args.constraints[0]
    return {
    targetName: ValidationArgument?.targetName,
    name: JOI_VALIDATOR,
    constraints: ValidationArgument?.constraints,
    validator: {
        validate: (value: any, args : any) : boolean => {
            //TODO check if it can support bulk valdation instead of calling one by one.
            //ValidationArguments?.validatorCallback(value, args)s
            const JoiAdpater = new JoiValidationAdapter(value, ValidationArgument);
            const result = JoiAdpater.validate();
            //check any errors
            if(JoiAdpater.getError(result)) {
                console.log('errors', JoiAdpater.getError(result));
                return false;
            }
            return true;
        },
        defaultMessage: validationOptions?.message ||  buildMessage(eachPrefix => eachPrefix + '$property must be empty', validationOptions),
    },
};
}