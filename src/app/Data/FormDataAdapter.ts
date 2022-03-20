import { IData } from "./IData";

type file = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  webkitRelativePath: string;
};
export default class FormDataAdapter implements IData {
  Data: FormData | string;
  Type: any;

  constructor(data: string | FormData) {
    this.Data = data;
    //add custom type here to call a function to that type.
    this.Type = {
      File: { 
          type: File,
          fn: this.getFile
      }
    };
  }

  get(name: string): any {
    if (this.Data instanceof FormData) {
      let data = this.Data.get(name);

      Object.keys(this.Type).forEach((key) => {
        if (data instanceof this.Type[key].type) {
            data = this.Type[key].fn(data);
        }
      });
      
      return data;
    } else {
      return this.Data;
    }
  }

  getFile(fileData: File): file {
    return {
      name: fileData.name,
      type: fileData.type,
      size: fileData.size,
      lastModified: fileData.lastModified,
      webkitRelativePath: fileData.webkitRelativePath,
    };
  }
}
