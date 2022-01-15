Usage: 

    const app = document.getElementById('app')
    const Form = {
      Form: {
        FieldType: 'form',
        name: 'login-form',
        id: 'login-form',
        className: 'login-form',
        method: '',
        onSubmit: function(e, validation){      
        },
        event: [
          //add default onsubmit and  add anyother events.
          {
            event: 'mouseover',
            callbackfn: (e) => {
              e.preventDefault()
              // console.log('submit')
            }
          },
        ],
      },
      Field: [
        {
          label: 'UserName',
          FieldType: 'text',
          id: 'TestID',
          name: "username",
          className: 'ClassName',
          placeholder: 'User name',
          value: '',
          event: 'Event',
          error: {
            as: 'span',
          },
          validation: [
            {
              type: 'isEmpty',
              message: 'User name is required'
            },
            {
              type: 'minLength',
              constraints: [10],
              message: 'User name must be at least 10 characters long'
            }
          ],
          extra: {
            min: 1,
            max: 10,
          },
        },
        {
          label: 'Password',
          FieldType: 'password',
          id: 'user-password',
          placeholder: "Password",
          name: "user-password",
          className: 'ClassName',
          value: '',
          event: 'Event',
          validation: [
            {
              type: 'isEmpty',
              message: 'Password is required'
            }],
          extra: {
            min: 1,
            max: 10,
          },
        },
        {
          label: "Submit",
          FieldType: "submit",
          id: 'submit-button',
          className: 'btn-name',
          event: [{
            event: 'onmouseover',
            callbackfn: function (e) {
              console.log(e)
            }
          }],
        }
      ]
    };

    let NewForm = form
    app.innerHTML = NewForm.form(Form)
