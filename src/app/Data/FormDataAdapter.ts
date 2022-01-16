import { IData } from "./IData";

export default class FormDataAdapter implements IData {
    Data: FormData | string;
    constructor(data: string | FormData) {
        this.Data = data;
    }


    get(name: string): any {
        if (this.Data instanceof FormData) {
            return this.Data.get(name);
        }
        else {
            return this.Data;
        }
    }
}