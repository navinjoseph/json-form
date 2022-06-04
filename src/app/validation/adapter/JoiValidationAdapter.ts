import IValidationAdpater from "./IValidationAdpater";
import JoiService from "../service/JoiService";
import IValidationService from "../service/IValidationservice";
import { ValidationArguments } from "../ValidationArguments";
import Joi, { ValidationError, ValidationResult } from "joi";

export default class JoiValidationAdapter implements IValidationAdpater {
  private value: any;
  private args: ValidationArguments;
  private JoiService: IValidationService;
  private Joischema: any;

  constructor(value: any, args: ValidationArguments) {
    this.value = value;
    this.args = args;
    this.JoiService = new JoiService();
    this.Joischema = this.args.validatorCallback(this.JoiService.getService());
  }

  getError(joiValidateResult: ValidationResult): ValidationError | undefined {
    const { error, value } = joiValidateResult;
    return error;
  }

  public validate<T = ValidationResult>(): T {
    if (this.JoiService.isValidSchema(this.Joischema)) {
      return this.Joischema.validate(this.value);
    }
    throw new Error("Invalid schema");
    //    return new Error("Invalid Joi schema");
  }

  public async validateAsync<T = ValidationResult>(): Promise<T> {
    if (this.JoiService.isValidSchema(this.Joischema)) {
      const validate = await this.Joischema.validate(this.value);
      return validate;
    }
    throw new Error("Invalid schema");
  }

  // private convertToJoiSchema(defenition: any): Joi.Schema {
  //     const convertSchema = this.JoiService.compile(defenition);
  //     return convertSchema;
  // }
}
