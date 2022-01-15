import { ValidationArguments } from '../ValidationArguments';
import { ValidationOptions } from '../ValidationOptions';
import { buildMessage } from './buildMessage';
// import { buildMessage, ValidateBy } from '../common/ValidateBy';
 import isLengthValidator from 'validator/lib/isLength';

export const MIN_LENGTH = 'minLength';



 /**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function minLength(value: unknown, min: number): boolean {
  console.log('minLength', typeof value === 'string' && isLengthValidator(value, { min }));
  
  return typeof value === 'string' && isLengthValidator(value, { min });
}

/**
 * Checks if the string's length is not less than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function MinLength(ValidationArguments: ValidationArguments, validationOptions?: ValidationOptions)  {
  return {
      targetName: ValidationArguments.targetName,
      name: MIN_LENGTH,
      constraints: ValidationArguments.constraints,
      validator: {
        validate: (value: any, args: any): boolean => minLength(value, args.constraints[0]),
        defaultMessage: validationOptions?.message || buildMessage(
          eachPrefix => eachPrefix + '$property must be longer than or equal to $constraint1 characters',
          validationOptions
        ),
      },
    }
    // validationOptions
}

