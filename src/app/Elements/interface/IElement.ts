import { IElementArttibutes } from "./IElementArttibutes";

export interface IElement {
    FieldParams: IElementArttibutes[],
    FinalRender: string
    render(): any;
}