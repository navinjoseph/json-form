import Handlebars from 'handlebars';
import Element from '../render/Element';

Handlebars.registerHelper('renderHTML', function(options) {  
    const Field =  new Element(options).render();
    return Field;
 });

const Form = `
    <form name="{{name}}" id="{{id}}" class="{{className}}">
        {{{renderHTML childrenElement}}}
    </form>
`;

export default Form;