import IEvent from "src/app/Event/IEvent";

export interface IForm {
    FieldType?: string;
    id?: string,
    className?: string,
    name?: string,
    method?: string,
    onSubmit: Function,
    event: [IEvent] | [],
    childrenElement?: any,
}