import { IsEmpty as isEmpty  } from "./isEmpty";
import { MinLength as minLength } from "./minLength";
import {CustomValidator as customValidator} from "./customValidator";
import { JoiValidator } from "./JoiValidator";
export const Store: any = {
    isEmpty,
    minLength,
    joi: JoiValidator,
    customValidator
}