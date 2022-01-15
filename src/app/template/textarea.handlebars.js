import Handlebars from "handlebars";
import error from "./error.handlebar";

Handlebars.registerPartial('error', error);


const TextArea = `
    <div class="spacing-top-10">
        <label>{{label}}</label>
        <textarea name="{{name}}" id="{{id}}" class="{{className}}" value="{{value}}" min="{{min}}" max="{{max}}" placeholder="{{placeholder}}"> </textarea>
        {{> error as=error.as }}
        </br>
    </div>
    `

export default TextArea
