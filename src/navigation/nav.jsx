import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../src/index.scss';
import '../../src/pages/css/layout.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { configureFakeBackend, authHeader, handleResponse } from "../services/fack.backend";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from '../serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from '../store';
import { useHistory } from 'react-router';

import { Auth0Provider } from '@auth0/auth0-react'
//*******Component *//
import Adminnav from '../navigation/Adminnav';
import Usernav from '../navigation/Usernav';

//import GlobalUserType  from '../constant/index';

const Nav = () => {
    let navigate = useHistory();
    const [UserType, SetUserType] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const [ActiveUser, SetActiveUser] = useState(localStorage.Session == undefined ? "" : localStorage.Session);
    const [LoginUser, SetLoginUser] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    if (UserType === "1" || UserType === "2") {
        return (

            <>
                <Adminnav />
            </>
        )
    }
    else if (UserType === "3") {
        return (

            <>
                <Usernav />
            </>
        )
    }
    else{
    window.location.href = `${process.env.PUBLIC_URL}/login`;
      }    
  
 //alert(JSON.stringify(window.user));
    // console.log(JSON.stringify(window.user));
    

}

export default Nav;