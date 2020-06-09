import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Protected from "./components/Protected";
import Unprotected from "./components/Unprotected";
import Home from './components/HomePage';
import GuardedRoute from './components/GuardedRoute';
import SignUp from './components/SignUp'

export default function Album() {
  const[isAutheticated, setisAutheticated] = useState(false);


  function login(){
    setisAutheticated(true);
    console.log("loggedInUser:" + isAutheticated)
  }

  function logout(){
    setisAutheticated(false);
    console.log("loggedInUser:" + isAutheticated)
  }
  


  return (
        <Router>
            <div>
              <ul>
                <li>
                  <Link to='/'>
                    Link to Home Page
                </Link>
                </li>
                <li>
                  <Link to='/protected'>
                    Link to Protected Page
                </Link>
                </li>
                <li>
                  <Link to='/unprotected'>
                    Link to Unprotected Page
                </Link>
                </li>
              </ul>
              <button onClick={login}>Login</button>
              <br/>
              <button onClick={logout}>Logout</button>
            </div>
            <Switch>
              <Route exact path='/' component={Unprotected}/>
              <Route path='/unprotected' component={Unprotected} />
              <Route path='/signup' component={SignUp} />
              <GuardedRoute path='/protected' component={Protected} auth={isAutheticated} />
            </Switch>
          </Router>
  );
}
