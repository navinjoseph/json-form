const error = `
    {{#if as}}
        <{{{as}}} class="{{name}}-error all-errors" ></{{{as}}}
    {{^}}
         <p class="{{name}}-error all-errors"></p>
    {{/if}}
`;

export default error;