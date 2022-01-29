import Handlebars from "handlebars";
import { object } from "joi";
import error from "./error.handlebar";

Handlebars.registerPartial("error", error);

Handlebars.registerHelper("InputType", function (options) {
  let attributes = [];

  Object.keys(options.hash).forEach((key) => {
    if (options.hash.hasOwnProperty(key)) {
      let escapedKey = Handlebars.escapeExpression(key);
      let escapedValue = Handlebars.escapeExpression(options.hash[key]);
      let Value = options.hash[key];

      if (escapedKey === "extraAttr" && typeof Value === "object") {
        Object.keys(Value).forEach((key) => {
          let escapedInnerKey = Handlebars.escapeExpression(key);
          let escapedInnerValue = Handlebars.escapeExpression(Value[key]);
          attributes.push(escapedInnerKey + '="' + escapedInnerValue + '"');
        });
      } else {
        attributes.push(escapedKey + '="' + escapedValue + '"');
      }
    }
  });

  // var escapedText = Handlebars.escapeExpression(text);
  let escapedOutput = "<input " + attributes.join(" ") + "/>";
  return new Handlebars.SafeString(escapedOutput);
});

const TextInput = `
    <div class="spacing-top-10">
        <label>{{label}}</label>
        {{InputType type=Fieldtype name=name id=id  value=value class=className placeholder=placeholder extraAttr=extraAttr}}
        {{> error as=error.as }}
        </br>
    </div>
    `;

// <input type="{{Fieldtype}}" name="{{name}}" id="{{id}}" class="{{className}}" value="{{value}}" min="{{min}}" max="{{max}}" placeholder="{{placeholder}}">

export default TextInput;
