import IEvent from "src/app/Event/IEvent";

export interface IButton {
    FieldType?: string | undefined;
    id: string;
    className?: string | undefined;
    name?: string | undefined;
    label: string;
    event: [IEvent];
    disable?: boolean | undefined;
    onSubmit: () => void;
}