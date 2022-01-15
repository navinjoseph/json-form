import { ValidationSchema } from "src/app/validation/schema/ValidationSchema";
import { MinMax } from "../types/minmax";
import { TError } from "./TError";


export default interface IFieldBase {
    FieldType?: string | "text",
    id: string,
    className?: string,
    name: string,
    value?:string | Object | number | [],
    placeholder?: string,
    event: string,
    validation: [ValidationSchema],
    required?: boolean | true,
    disable?: boolean,
    extra?: MinMax
    label: string
    error?: TError
    registerSchema(param: any): any

}