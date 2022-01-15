import { Store } from "../validation/common/validationStore";
import { ValidationArguments } from "../validation/ValidationArguments";
import { ValidationOptions } from "../validation/ValidationOptions";

//create typescript interface with param targetName as string
export interface IArgs  {
  targetName: string;
}
export default class ValidatorFactory {

    constructor(ValidationArguments: ValidationArguments, ValidationOptions: ValidationOptions) {
        if(Store[ValidationArguments.type] === undefined || Store[ValidationArguments.type] === null ) {
            throw new Error(`Validation type of \'${ValidationArguments.type}\' is not in the store`);
        }
       
        return new Store[ValidationArguments.type](ValidationArguments, ValidationOptions);
    }

}