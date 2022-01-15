import ElementFactory from "../factory/ElementFactory";
import Render from "./render";
import IFieldBase from "../Elements/interface/IFieldBase";
import { IElementArttibutes } from "../Elements/interface/IElementArttibutes";
import { IElement } from "../Elements/interface/IElement";


export default class Element implements IElement{
    FieldParams: IElementArttibutes[] = [];
    FinalRender: string = "";


    constructor(param: IElementArttibutes[]) {
        this.FieldParams = param;
    }

    render() {
        const ElementfactoryInstance: ElementFactory = new ElementFactory(this.FieldParams);

        for (const ElementClass of ElementfactoryInstance.getFieldClass()) {                        
            const render = new Render(ElementClass);
            this.FinalRender += render.compile();
        }

        return this.FinalRender;
    }
}