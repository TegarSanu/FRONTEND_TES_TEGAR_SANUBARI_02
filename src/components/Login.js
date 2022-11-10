import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { First } from "react-bootstrap/esm/PageItem";
import axios from "axios";
import { toast, useToast } from "react-toastify"
import Dashboard from "./Dashboard";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';


const Login = () => {


  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const onChangeForm = (label, event) => {
    switch (label) {
      case "username":
        setLoginForm({ ...loginForm, username: event.target.value })
        break;
      case "password":
        setLoginForm({ ...loginForm, password: event.target.value })
        break;
    }
  };

  const onSubmitHandler = async (event) => {

    // const toast = useToast();
    event.preventDefault()
    console.log(loginForm)

    var grand = 'grant_type=&username=' + loginForm.username + '&password=' + loginForm.password + '&scope=&client_id=&client_secret='

    //call_api
    await axios.post('http://reqruitement-test.teknologikartu.com/v1/auth/login', grand)
      .then((response) => {
        console.log(response.data)
        //save token
        localStorage.setItem("auth_token", response.data.access_token)
        localStorage.setItem("auth_token_type", response.data.token_type)
        alert("Login Success")

        setTimeout(() => {
          window.location.reload()
        }, 1000)

      }).catch((error) => {
        alert("Maaf Username atau Password tidak sesuai", console.log(error.response.data))


      })
  }

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput onChange={(event) => {
                onChangeForm("username", event)
              }} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' type='email' size="lg" />
              <MDBInput onChange={(event) => {
                onChangeForm("password", event)
              }} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' type='password' size="lg" />

              <MDBBtn onClick={onSubmitHandler} outline className='mx-2 px-5' color='white' size='lg' >
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  )
}

export default Login;