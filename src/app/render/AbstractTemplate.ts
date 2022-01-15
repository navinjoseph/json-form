import Event from "../Event/Event";

export default abstract class AbstractTemplate {
    template: any;
    transformedParams: any;
   
    constructor(params: any) {
        this.setParam(params);
        this.setTemplate(this.template);
        this.registerEvent();
    }

    getTemplate() {
        return this.template;
    }

    getParams(name?: string) {
        if (name !== undefined) {
            // search for the name in the transformedParams
            return this.transformedParams[0][name];
        }

        return this.transformedParams;
       
    }
    
    registerEvent() {        
        if (this.transformedParams.event !== undefined || this.transformedParams.event !== null || this.transformedParams.event !== '') {
            const params = this.getParams()
            const EventInstace = new Event(params[0]?.id, params[0]?.event).addEvent()
          }   
    }
    
    
    abstract setParam(param: any) : any
    abstract setTemplate(template: any) : any

}