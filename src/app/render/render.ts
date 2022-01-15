import Handlebars from "handlebars";
import AbstractTemplate from "./AbstractTemplate";
import { Irender } from "./Irender";

export default class Render implements Irender {
    templateEngine: any;
    template: any;
    params: any;
    ElementClass: any;
    
    constructor(ElementClass: AbstractTemplate) {
        this.templateEngine = Handlebars;
        this.ElementClass = ElementClass;
        
        this.template = this.ElementClass.getTemplate();
        this.params = this.ElementClass.getParams();
    }

    compile() {                                        
        let template = this.templateEngine.compile(this.template);        
        return template(...this.params);
    }
}
