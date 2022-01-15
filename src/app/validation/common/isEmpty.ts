import { IArgs } from 'src/app/factory/ValidatorFactory';
import { ValidationArguments } from '../ValidationArguments';
import { ValidationOptions } from '../ValidationOptions';
import { buildMessage } from './buildMessage';

export const IS_EMPTY = 'isEmpty';

/**
 * Checks if given value is empty (=== '', === null, === undefined).
 */
export function isEmpty(value: unknown): boolean {    
    return value === '' || value === null || value === undefined;
}

/**
 * Checks if given value is empty (=== '', === null, === undefined).
 */

//  validationOptions?: ValidationOptions
export function IsEmpty( ValidationArguments?: ValidationArguments, validationOptions?: ValidationOptions)  {
    return {
    targetName: ValidationArguments?.targetName,
    name: IS_EMPTY,
    validator: {
        validate: (value: any, args : any): boolean => !isEmpty(value) ,
        defaultMessage: validationOptions?.message ||  buildMessage(eachPrefix => eachPrefix + '$property must be empty', validationOptions),
    },
};
}
