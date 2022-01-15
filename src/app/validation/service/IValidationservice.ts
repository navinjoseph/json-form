export default interface IValidationService {
    validate(value : any, schema: any): any
    compile(defention: any): any
    isValidSchema(schema: any): boolean
    getService(): any
}