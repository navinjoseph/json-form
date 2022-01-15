import Handlebars from "handlebars";
import error from "./error.handlebar";

Handlebars.registerPartial('error', error);


const TextInput = `
    <div class="spacing-top-10">
        <label>{{label}}</label>
        <input type="{{Fieldtype}}" name="{{name}}" id="{{id}}" class="{{className}}" value="{{value}}" min="{{min}}" max="{{max}}" placeholder="{{placeholder}}">
        {{> error as=error.as }}
        </br>
    </div>
    `

export default TextInput
