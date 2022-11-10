import Dashboard from './components/Dashboard';
import Login from './components/Login'
import 'bootstrap'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [token, setToken] = useState()

  useEffect(()=>{
    const auth = localStorage.getItem("auth_token")
    setToken(auth)
  },[token])

  const pages = () => {
    if(token == null) {
      return (
        <Login />
      );
    }else{
      return <Dashboard />
    }
  }

  return <React.Fragment>{pages()}</React.Fragment>
  
}

export default App;
