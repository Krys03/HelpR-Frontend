import React from 'react';
import { connectBack } from '../../tools/axiosURL'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Form,TextField } from 'react-components-form';
import Schema from 'form-schema-validation';
import { login } from '../../tools/actions'
import './Signin.css'
import {
	Grid,
	Header,
	Segment,
	Button,
	Icon, 
	Message,
	Form as FormSemantic
  } from 'semantic-ui-react'

const Signin = (props) => {

	const loginSchema = new Schema({
		email:{
			type: String,
			validators: [
				{
					validator: (value) => {
						if(value === undefined || value === '') {
							return false;
						}
					},
					errorMessage: <div className="offset-2 text-danger">Email is required</div>
				},
				{
					validator: (value) => {
          	var emailTest = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
            if(!emailTest.test(value)) {
              return false;
            }
          },
					errorMessage: <div className="offset-2 text-danger">This is not a valid email</div>
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
	})

	const submitMethod = (model) => {
	  console.log('form is valid')
	  let formInfo = { 
			user: {
    	email: model.email,
    	password: model.password
			}
		}
		loginUser(formInfo)
	}

	const loginUser = (formInfo) => {
	let notification = document.getElementById('notif')
	connectBack.post('users/login', formInfo)
		.then(response => {
			notification.innerHTML = response.data.status
			props.login(response.data)
		})
		.catch(error => {
			notification.innerHTML = error.response.data.error
		})
	}

	return( 
		
		<div class="ui equal width center aligned padded grid">
  		<div class="row">
        <div class="column" style={{ height: '999px'}} id="backg"> 
         <div class="container">
        <div class="child">
        <img src={require('../../media/helpr.png')} alt="test" />
        </div>
        </div>
        </div>
    <div class="white column">
		
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
      <Grid.Column style={{ maxWidth: 550 }}>
        <Header as='h2' color='blue' >
        <Icon name="lock"/> Log in
        </Header>
		<FormSemantic>
        <Form size='large' onSubmit={submitMethod} schema={loginSchema}>

          <Segment stacked>
		  <p className="text-success" id="notif"></p>
            <TextField  fluid icon='user' id="email" iconPosition='left' placeholder='E-mail address' label="Email"  type="email" label="email" name="email"/>
            <TextField 
            
              fluid
              
              
              icon='lock'
              label="password"
              name="password"
              iconPosition='left'
              placeholder='Password'
              type='password'
			  
               
            />
  
            <Button color='blue' fluid size='large' value='Submit' style={{ marginTop: 15 }} >
              Login
            </Button>
          
          </Segment>
		  </Form>
        </FormSemantic>
        <Message>
          New to us? <a href='http://localhost:3000/Sign-up'>Register</a>
        </Message>
      </Grid.Column>
    </Grid>



	</div>
  </div>
</div>

			
		
	)
}

const mapDispatchToProps = dispatch => {
	return {
		login: (user) => { dispatch(login(user)) }
	}
}

const mapStateToProps = state => {
	return {
		getLoading: state.loading
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin))