export default interface  IValidator {    
     excecute(def: any, value: any, args: any) : any
     excecuteAsync(def: any, value: any, args: any) : any
}