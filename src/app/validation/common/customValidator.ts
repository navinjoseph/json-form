import { ValidationArguments } from "../ValidationArguments";
import { ValidationOptions } from "../ValidationOptions";
import { buildMessage } from "./buildMessage";

export const CUSTOM_VALIDATOR = 'CustomValidator';


export function CustomValidator(ValidationArguments?: ValidationArguments, validationOptions?: ValidationOptions)  {
    return {
    targetName: ValidationArguments?.targetName,
    name: CUSTOM_VALIDATOR,
    validator: {
        validate: (value: any, args : any) : boolean => ValidationArguments?.validatorCallback(value, args),
        defaultMessage: validationOptions?.message ||  buildMessage(eachPrefix => eachPrefix + '$property must be empty', validationOptions),
    },
};
}