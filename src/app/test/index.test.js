import chai, { expect, assert } from 'chai'
import jsdom, { JSDOM } from 'jsdom'
import chaiDom, { document } from 'chai-dom'
import { form } from '../index.ts'
import { describe } from 'mocha'
import ValidatorFactory from '../factory/ValidatorFactory'
import fs from 'fs';

chai.use(chaiDom)



describe('Test attributes', function () {
  const TestAttributes = {
    Form: {
      FieldType: 'form',
      name: 'login-form',
      id: 'login-form',
      className: 'login-form',
      method: '',
      onSubmit: function (e, validation) {
        if (!validation.hasError) {
          console.log('next process')
        }
      },
      event: [
        //add default onsubmit and  add anyother events.
        {
          event: 'mouseover',
          callbackfn: (e) => {
            e.preventDefault()
            //  console.log('submit')
          },
        },
      ],
    },
    Field: [
      {
        label: 'UserName',
        FieldType: 'text',
        id: 'TestID',
        name: 'username',
        className: 'ClassName',
        placeholder: 'User name',
        value: '',
        event: [
          {
            event: 'change',
            callbackfn: (e) => {
              //  console.log(e.target.value)
            },
          },
        ],
        error: {
          as: 'span',
        },
        validation: [
          {
            type: 'isEmpty',
            message: 'User name is required',
          },
          {
            type: 'minLength',
            constraints: [10],
            message: 'User name must be at least 10 characters long',
          },
        ],
        extra: {
          min: 1,
          max: 10,
          test: 'test',
        },
      },
      {
        label: 'Search',
        FieldType: 'search',
        id: 'search',
        name: 'search',
        className: 'form-field',
      },
      {
        label: 'Reset',
        FieldType: 'reset',
        id: 'reset-button',
        name: 'reset',
        className: 'btn-field',
      },
      {
        label: 'Submit',
        FieldType: 'submit',
        id: 'submit-button',
        className: 'btn-name',
        event: [
          {
            event: 'onmouseover',
            callbackfn: function (e) {
              console.log(e)
            },
          },
        ],
      },
    ],
  }

  let NewForm = form(TestAttributes);
  const dom = new JSDOM(NewForm);


  it('should return html from', function () {
    expect(dom.window.document.querySelector('form')).to.match('form')
  });

  it('should return text field', function () {
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('type', 'text');
  });

  it('should return the correct className', function () {
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('class', 'ClassName');

  });

  it('should return the correct id', function () {
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('id', 'TestID');
  });
  
  it('should return the correct Label', function() {
    expect(dom.window.document.querySelector('label')).to.have.text('UserName');
  });

  it('Should return the correct name', function () {
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('name', 'username');
  });

  it('Should return the correct placeholder', function () {
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('placeholder', 'User name');
  });

  it('should return text field with, min, max & test', function () {
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('min', '1')
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('max', '10')
    expect(dom.window.document.querySelector('#TestID')).to.have.attribute('test', 'test')

  })

  it('should return search field with no extra attributes', function () {
    expect(dom.window.document.querySelector('#search')).to.not.attribute('min', '1')
    expect(dom.window.document.querySelector('#search')).to.not.attribute('max', '10')
    expect(dom.window.document.querySelector('#search')).to.not.attribute('test', 'test')

  })



})

describe('Test Joi validator', function () {
  const meta = {
    type: 'joi',
    constraints: {},
    validatorCallback: (joi) => {
      return joi.string().required().min(10)
    },
    message: 'joi Validatior',
  }
  const param = {
    name: 'username',
  }

  // const ValidationArguments = {
  //   type: meta.type,
  //   constraints: meta.constraints,
  //   targetName: param.name,
  //   validatorCallback: meta.validatorCallback,
  // }

  const ValidationOptions = {
    message: meta.message,
  }

  const instance = new ValidatorFactory(ValidationArguments, ValidationOptions)

  it('should return Error', function () {
    expect(
      {
        value: '',
        error: [],
      },
      instance.validator.validate(''),
    )
  })

  it('should return Value', function () {
    expect(
      {
        value: 'test',
        error: [],
      },
      instance.validator.validate('test'),
    )
  });

  // it('should return the custom error', function () {

  // });
})


// describe('Test input file', function () {
//   const readFile = fs.readFileSync('/Users/navinjoseph/Navinjoseph/json-form/src/app/test/assets/test1.jpg');
//   const meta = {
//     type: 'joi',
//     constraints: {},
//     validatorCallback: (Joi) => {
//       return Joi.object().keys({
//         name: Joi.string().required(),
//         size: Joi.number().max(100178).required(),
//         type: Joi.string().pattern(/(image\/jpeg)|(application\/pdf)/),
//         lastModified: Joi.any().required(),
//         webkitRelativePath: Joi.any().required(),
//       }).messages({
//           "string.empty": "File is required",
//           "number.max": "File size should be less than 100kb",
//           "string.pattern.base": "File type should be jpeg",
//         })
//         .label("File");
//     },
//     message: 'joi Validatior',
//   }
//   const param = {
//     name: 'file',
//   }

//   const ValidationArguments = {
//     type: meta.type,
//     constraints: meta.constraints,
//     targetName: param.name,
//     validatorCallback: meta.validatorCallback,
//   }

//   const ValidationOptions = {
//     message: meta.message,
//   }

//   const instance = new ValidatorFactory(ValidationArguments, ValidationOptions)

//   it('should return Error', function () {
//     expect(
//       {
//         value: '',
//         error: [],
//       },
//       instance.validator.validate(readFile),
//     )
//   })
// });

// describe('Render Forms and Fields', function () {
//   const TestFormAndFields = {
//     Form: {
//       FieldType: 'form',
//       name: 'login-form',
//       id: 'login-form',
//       className: 'login-form',
//       method: '',
//       onSubmit: function (e, validation) {
//         if (!validation.hasError) {
//           console.log('next process')
//         }
//       },
//       event: [
//         //add default onsubmit and  add anyother events.
//         {
//           event: 'mouseover',
//           callbackfn: (e) => {
//             e.preventDefault()
//             //  console.log('submit')
//           },
//         },
//       ],
//     },
//     Field: [
//       {
//         label: 'UserName',
//         FieldType: 'text',
//         id: 'TestID',
//         name: 'username',
//         className: 'ClassName',
//         placeholder: 'User name',
//         value: '',
//         event: [
//           {
//             event: 'change',
//             callbackfn: (e) => {
//               //  console.log(e.target.value)
//             },
//           },
//         ],
//         error: {
//           as: 'span',
//         },
//         validation: [
//           {
//             type: 'isEmpty',
//             message: 'User name is required',
//           },
//           {
//             type: 'minLength',
//             constraints: [10],
//             message: 'User name must be at least 10 characters long',
//           },
//         ],
//         extra: {
//           min: 1,
//           max: 10,
//         },
//       },
//       {
//         label: 'Password',
//         FieldType: 'password',
//         id: 'user-password',
//         placeholder: 'Password',
//         name: 'user-password',
//         className: 'ClassName',
//         value: '',
//         event: [
//           {
//             event: 'change',
//             callbackfn: (e) => {
//               //  console.log(e.target.value)
//             },
//           },
//         ],
//         validation: [
//           {
//             type: 'isEmpty',
//             message: 'Password is required',
//           },
//         ],
//         extra: {
//           min: 1,
//           max: 10,
//         },
//       },
//       {
//         label: 'Agreement 1',
//         FieldType: 'checkbox',
//         id: 'accept-aggrement',
//         name: 'accept-aggrement',
//         className: 'form-field',
//         validation: [
//           {
//             type: 'customValidator',
//             validatorCallback: function (value, args) {
//               console.log('customValidator', value, args)
//               return value === true
//             },
//             message: 'You must accept the aggrement',
//           },
//         ],
//       },
//       {
//         label: 'Agreement 2',
//         FieldType: 'checkbox',
//         id: 'accept-aggrement-2',
//         name: 'accept-aggrement-2',
//         className: 'form-field',
//         validation: [
//           {
//             type: 'customValidator',
//             validatorCallback: function (value, args) {
//               console.log('customValidator', value, args)
//               return value === true
//             },
//             message: 'You must accept the aggrement no 2',
//           },
//         ],
//       },
//       {
//         label: 'TextArea',
//         FieldType: 'textarea',
//         id: 'textarea',
//         name: 'textarea',
//         className: 'form-field',
//       },
//       {
//         label: 'Email',
//         FieldType: 'email',
//         id: 'email',
//         name: 'email',
//         className: 'form-field',
//       },
//       {
//         label: 'File',
//         FieldType: 'file',
//         id: 'file',
//         name: 'file',
//         className: 'form-field',
//       },
//       {
//         label: 'Image',
//         FieldType: 'image',
//         id: 'image',
//         name: 'image',
//         className: 'form-field',
//       },
//       {
//         label: 'Month',
//         FieldType: 'month',
//         id: 'month',
//         name: 'month',
//         className: 'form-field',
//       },
//       {
//         label: 'Week',
//         FieldType: 'week',
//         id: 'week',
//         name: 'week',
//         className: 'form-field',
//       },

//       {
//         label: 'Number',
//         FieldType: 'number',
//         id: 'number',
//         name: 'number',
//         className: 'form-field',
//       },
//       {
//         label: 'radio',
//         FieldType: 'radio',
//         id: 'radio1',
//         name: 'radio1',
//         className: 'form-field',
//       },
//       {
//         label: 'range',
//         FieldType: 'range',
//         id: 'range',
//         name: 'range',
//         className: 'form-field',
//       },
//       {
//         label: 'Search',
//         FieldType: 'search',
//         id: 'search',
//         name: 'search',
//         className: 'form-field',
//       },
//       {
//         label: 'Telephone',
//         FieldType: 'tel',
//         id: 'tel',
//         name: 'tel',
//         className: 'form-field',
//       },
//       {
//         label: 'URL',
//         FieldType: 'url',
//         id: 'url',
//         name: 'url',
//         className: 'form-field',
//       },
//       {
//         label: 'Reset',
//         FieldType: 'reset',
//         id: 'reset-button',
//         name: 'reset',
//         className: 'btn-field',
//       },
//       {
//         label: 'Submit',
//         FieldType: 'submit',
//         id: 'submit-button',
//         className: 'btn-name',
//         event: [
//           {
//             event: 'onmouseover',
//             callbackfn: function (e) {
//               console.log(e)
//             },
//           },
//         ],
//       },
//     ],
//   }

//   let NewForm = form(TestFormAndFields)
//   const dom = new JSDOM(NewForm)

//   //console.log(NewForm);

//   it('should return html from', function () {
//     expect(dom.window.document.querySelector('form')).to.match('form')
//   })

//   it('should return text field', function () {
//     expect(dom.window.document.querySelector('#TestID')).to.match(
//       '[type="text"]',
//     )
//   })
// })