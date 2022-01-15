import ElementFactory from "../factory/ElementFactory";
import Render from "./render";
import Element from "./Element";
import { IElement } from "../Elements/interface/IElement";
import { IElementArttibutes, IElementFormArttibutes } from "../Elements/interface/IElementArttibutes";

export default class FromElement implements IElement {
    FieldParams: IElementArttibutes[] = [];
    FormParams: IElementFormArttibutes;
    FinalRender: string = "";

    constructor(FormParam: IElementFormArttibutes, ChidrenElements: IElementArttibutes[]) {
        this.FieldParams = ChidrenElements;
        this.FormParams = FormParam;
        this.setChilderElement(ChidrenElements)
    }

    render() {

        const FormElementInstance: ElementFactory = new ElementFactory([this.FormParams]);
        
        for (const ElementClass of FormElementInstance.getFieldClass()) {
            const render = new Render(ElementClass);
            this.FinalRender += render.compile();
        }

        return this.FinalRender;

    }

    setChilderElement(childrenElementParam: IElementArttibutes[]) {
        this.FormParams.childrenElement = childrenElementParam
    }
}