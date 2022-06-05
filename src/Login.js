import React from 'react'
import  './Login.css'
import logo from './logo.png'
import {loginUrl} from './spotify'
function Login(){
    return(
        <div className="login">
          <img src={logo} alt=""/>
          <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login;