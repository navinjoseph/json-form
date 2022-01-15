import { ISubmit } from "src/app/Elements/interface/Isubmit";
import { MinMax } from "../types/minmax";
import { IButton } from "./IButton";
import IFieldBase from "./IFieldBase";
import { IForm } from "./IFrom";

export interface IElementFieldArttibutes extends IFieldBase, MinMax {}

export interface IElementFormArttibutes extends IForm {}

export interface IElementButtonArttibutes extends IButton {}

export type IElementArttibutes = IElementFieldArttibutes | IElementButtonArttibutes | IElementFormArttibutes;