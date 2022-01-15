export default interface IValidationAdpater {
    validate<T>(value: any, rules: any): T;
    getError(args?: any): any;
}