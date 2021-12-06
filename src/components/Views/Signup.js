import React from 'react';
import { connectBack } from '../../tools/axiosURL'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Form, TextField} from 'react-components-form';
import Schema from 'form-schema-validation';
import { Button, Form as FormSemantic, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './Signup.css'


  const Signup = (props) => {

    

    const loginSchema = new Schema({
    first_name:{
      type: String,
      validators: [
        {
            validator: (value) => {
              if(value === undefined || value === '') {
                  return false;
              }
            },
            errorMessage: <div className="offset-2 text-danger">First name is required</div>
        },
        {
            validator: (value) => {
              if(value.length >= 50) {
                  return false;
              }
            },
            errorMessage: <div className="offset-2 text-danger">First name is too long</div>
        }
      ]
    },
    last_name:{
      type: String,
      validators: [
        {
            validator: (value) => {
              if(value === undefined || value === '') {
                  return false;
              }
            },
            errorMessage: <div className="offset-2 text-danger">Last name is required</div>
        },
        {
            validator: (value) => {
              if(value.length >= 50) {
                  return false;
              }
            },
            errorMessage: <div className="offset-2 text-danger">Last name is too long</div>
        }
      ]
    },
    email:{
        type: String,
        validators: [
            {
                validator: (value) => {
                  var emailtest = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
                  if(!emailtest.test(value)) {
                      return false;
                  }
                },
                errorMessage: <div className="offset-2 text-danger">This is not a vaild email</div>
            },
            {
                validator: (value) => {
                    if(value === undefined || value === '') {
                        return false;
                    }
                },
                errorMessage: <div className="offset-2 text-danger">Email is required</div>
            }
        ]
    },
    password: {
        type: String,
        validators: [
        {
            validator: (value) => {
              if(value === undefined || value === '') {
                  return false;
              }
            },
            errorMessage: <div className="offset-2 text-danger">Password is required</div>
        },
        {
            validator: (value) => {
              if(value.length <= 5) {
                  return false;
              }
            },
            errorMessage: <div className="offset-2 text-danger">Password is too short</div>
        }
      ]
    }
  });

  const submitMethod = (model) => {

    const image = document.querySelector("#image");
    let imageError = document.getElementById('imageError')
    imageError.innerHTML = '';
    if(!image.files[0]) {
       imageError.innerHTML = 'Government-approved ID is required'
      return
    }
    
    let formData = new FormData();
    formData.append("first_name", model.first_name)
    formData.append("last_name", model.last_name)
    formData.append("image", image.files[0], 'imageId')
    formData.append("email", model.email)
    formData.append("password", model.password)
    createUser(formData)
  }

  const createUser = (formInfo) => {
  let notification = document.getElementById('railsError')
  connectBack.post('users', formInfo)
    .then(response => {
      notification.innerHTML = response.data.message
      props.login(response.data)
    })
    .catch(error => {
      console.log('Error Sign up: ', JSON.stringify(error))
      notification.innerHTML = error.response.data.errors
    })
  }

  const errorMethod = (errors, model) => {
  }

    return(
      
          

<Grid textAlign='center' style={{ height: '1093px' }} verticalAlign='middle' id="backgsignup" style={{ marginTop: 0 }}>
    <Grid.Column style={{ maxWidth: 500 }}>
    <Image size='medium ' src={require('../../media/helpr.png')}  verticalAlign='middle'  attached='top'  style={{ marginBottom: '100px', }}/> 
      <Header as='h2'  textAlign='center'  inverted>
      
      
      
      </Header>
      <FormSemantic size='large' onSubmit={this.handleSubmit}>
        <Form
          schema={loginSchema} 
          onError={errorMethod}
          onSubmit={submitMethod}>
          <div className="text-danger" id="railsError"></div>

        <Segment stacked>
        <Header as='h3' color="blue">Sign up to Helpr</Header>
      
        
          <TextField fluid icon='user'iconPosition='left' placeholder='First name' label='Firstname' name='first_name' type='text'/> 
          <TextField fluid icon='user'iconPosition='left' placeholder='Last name' label='Lastname' name='last_name' type='text' />
          <TextField fluid icon='mail' iconPosition='left' placeholder='E-mail address' name='email' label='Email' type="email" />
          <FormSemantic.Field>
          <label>Government-approved ID</label>
          <input id="image" type="file" name="image"  required/>
          <p className="text-danger offset-2 col-8" id="imageError"></p>
          </FormSemantic.Field>
          <TextField
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            label="password"
            name='password'
          />

          <Button color='blue' fluid size='large' type="submit" style={{ marginTop: 15 }}>
            Create Account
          </Button>
        </Segment>
        </Form>
      </FormSemantic>
      <Message>
        Already have an account ? <a href='http://localhost:3001/login' >Sign In</a>
      </Message>
      <Grid>
      <Grid.Row columns={1}>
      <Grid.Column>
      </Grid.Column>
      </Grid.Row>
      </Grid>
    </Grid.Column>
  </Grid>
  

  
      
    )
  }
  
const mapDispatchToProps = dispatch => {
  return {
    login: (user) => { dispatch({ type: 'SET_AUTH', payload: user }) },
    loading: (val) => { dispatch({ type: 'LOADING', payload: val })}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Signup))
