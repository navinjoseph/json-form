import { ValidationArguments } from "../ValidationArguments";
import { ValidationOptions } from "../ValidationOptions";

export function buildMessage(
    impl: (eachPrefix: string, args?: ValidationArguments) => string,
    validationOptions?: ValidationOptions
  ): (validationArguments?: ValidationArguments) => string {
    return (validationArguments?: ValidationArguments): string => {
      const eachPrefix = validationOptions && validationOptions.each ? 'each value in ' : '';
      return impl(eachPrefix, validationArguments);
    };
  }
  