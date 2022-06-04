import JoiValidationAdapter from "../adapter/JoiValidationAdapter";
import { ValidationArguments } from "../ValidationArguments";
import { ValidationOptions } from "../ValidationOptions";
import { buildJoiMessage } from "./buildMessage";

export const JOI_VALIDATOR = "Joi";

export type JoiErrorMessage = {
  message: any;
  name: any;
};

export function JoiValidator(
  ValidationArgument: ValidationArguments,
  validationOptions?: ValidationOptions
) {
  const JoiError: Array<JoiErrorMessage> = [];

  return {
    targetName: ValidationArgument?.targetName,
    name: JOI_VALIDATOR,
    constraints: ValidationArgument?.constraints,
    validator: {
      validate:  (value: any, args: any): boolean => {
        //TODO check if it can support bulk valdation instead of calling one by one.
        const JoiAdpater = new JoiValidationAdapter(value, ValidationArgument);
        const result = JoiAdpater.validate();
        //check any errors
        if (JoiAdpater.getError(result)) {
          if (
            JoiError[0]?.name === ValidationArgument?.targetName) {
            JoiError[0]["message"] = JoiAdpater.getError(result)?.details[0].message;
          }  else {
            JoiError.push({message: JoiAdpater.getError(result)?.details[0].message, name: ValidationArgument?.targetName});
          }
        // console.log('JoiError', JoiError);
        
          return false;
        }
        return true;
      },
      validateAsync: async (value: any, args: any): Promise<boolean> => {
       //TODO check if it can support bulk valdation instead of calling one by one.
       const JoiAdpater = new JoiValidationAdapter(value, ValidationArgument);
       
       const result = await JoiAdpater.validateAsync();

       //check any errors
       if (JoiAdpater.getError(result)) {
         if (
           JoiError[0]?.name === ValidationArgument?.targetName) {
           JoiError[0]["message"] = JoiAdpater.getError(result)?.details[0].message;
         }  else {
           JoiError.push({message: JoiAdpater.getError(result)?.details[0].message, name: ValidationArgument?.targetName});
         }
       // console.log('JoiError', JoiError);
       
         return false;
       }
       return true;
      },
      defaultMessage: (value: any, args: any) =>
        buildJoiMessage(JoiError, args),
    },
  };
}
