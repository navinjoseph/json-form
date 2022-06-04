export default interface IValidationAdpater {
    validate<T>(value: any, rules: any): T;
    validateAsync<T>(value: any, rules: any): Promise<T>;
    getError(args?: any): any;
}