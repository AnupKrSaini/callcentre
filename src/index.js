import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '../src/pages/css/layout.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { firebase_app, auth0 } from './data/config';
import { configureFakeBackend, authHeader, handleResponse } from "./services/fack.backend";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';
import App from "./components/app";
import { Auth0Provider } from '@auth0/auth0-react'
import { useIdleTimer } from 'react-idle-timer';
import axios from 'axios';
import ConnectionInstance from './pages/apisettings/ConnectionInstance';
// Import custom Components

import Nav from './navigation/nav';

// pages
import Login from './pages/userlogin/login';
import ForgetPwd from './pages/userlogin/forgetPwd';
import ResetPwd from './pages/userlogin/resetPwd';

// Import Applications Components
import Signin from './auth/signin';

//config data
import configDB from './data/customizer/config'

import Callback from './auth/callback'




// setup fake backend
configureFakeBackend();


const Root = (props) => {

    const abortController = new AbortController();
    const [currentUser, setCurrentUser] = useState(localStorage.currentUser == undefined ? false : localStorage.currentUser);
    const [authenticated, setAuthenticated] = useState(false)
    const jwt_token = localStorage.getItem('token');
    const [UserType, SetUserType] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const [ActiveUser, SetActiveUser] = useState(localStorage.Session == undefined ? "" : localStorage.Session);
    const [LoginUser, SetLoginUser] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    //  localStorage.setItem('Session', "Active");
    //  localStorage.setItem('LoggedInUser', ds.UserId);
    //  localStorage.setItem('UName',ds.UserName);
    //  localStorage.setItem('UserTypeName',ds.UserTypeName);
    //  localStorage.setItem('UserType',ds.UserTypeId);

    const handleOnIdle = event => {

        //console.log('user is idle', event);
        localStorage.removeItem('profileURL')
        localStorage.removeItem('token');
          localStorage.removeItem('Session');
              localStorage.removeItem('LoggedInUser');
              localStorage.removeItem('UName');
               localStorage.removeItem('UserTypeName');
               localStorage.removeItem('UserType');
               localStorage.removeItem('CallingId');
               localStorage.removeItem("currentUser");

        window.location.href = `${process.env.PUBLIC_URL}/login`;
        //console.log('last active', getLastActiveTime())
      }

      const handleOnActive = event => {
        console.log('user is active', event)
        //console.log('time remaining', getRemainingTime())
      }

      const handleOnAction = event => {
        console.log('user did something', event)
      }

      const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        // timeout: 1000 * 60 *20,
        timeout: 1000 * 60 *240,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
      })
    // if(props.location.pathname=='/')
    // {
    //      window.location.href=`${process.env.PUBLIC_URL}/login`;
    //   localStorage.setItem('currentUser',false);
    //   localStorage.setItem('CallingId','');
    // }
    useEffect(() => {

        console.log('loaded');
        return () => {
            console.log('cleanup');
        }

    }, []);

    useEffect(() => {


        const requestOptions = { method: 'GET', headers: authHeader() };
        fetch('/users', requestOptions).then(handleResponse)
        const color = localStorage.getItem('color')
        console.log(color);
        const layout = localStorage.getItem('layout_version') || configDB.data.color.layout_version
        firebase_app.auth().onAuthStateChanged(setCurrentUser);
        setAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
        document.body.classList.add(layout);
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
        //abortController.abort();
        //CheckActiveUsers();

        // return function cleanup() {
        //     abortController.abort();
        // }

        // eslint-disable-next-line
    }, []);

    async function CheckActiveUsers() {

        if (LoginUser != null && ActiveUser == 'Active' && (UserType == "1" || UserType == "2")) {
            window.location.href = `${process.env.PUBLIC_URL}/admin/dashboard`;
        }

    }
    useEffect(() => {
       
            const id = setInterval(() => {
                AutoReleaseOutboundCalling();
                console.log('test');
              }, 300000);
              return () => clearInterval(id);    
          
    }, []);
    useEffect(() => {
       
        const id2= setInterval(() => {
            AutopbxclickpullindexDetails();
            console.log('test2');
          }, 1* 60 *1000);
          return () => clearInterval(id2);    
      
}, []);
async function AutopbxclickpullindexDetails()
     {

        try {

            let url=ConnectionInstance+ 'pbxcall/pbxclicktocallindex';

            let options = {
                method: 'GET',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
              data:{ }
            };

            let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    // let data = await response.data;
                    if(data.Success==true && data.Data=="2000")
                    {                        
                        console.log(true);
                    }
                    else{
                         if(data.ErrorList!=null && data.ErrorList.length>0)
                         {
                            let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                            console.log(Errtext);
                         }

                    }


                }
                else{
                    console.log('no record found');

                }
             // return data;
            } catch (error) {
                console.log(error.message);       
             }
     }
     async function AutoReleaseOutboundCalling()
     {

        try {

            let url=ConnectionInstance+ 'OutboundCalling/SETOutBoundAutoReleaseAssignedCalls';

            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
              data:{ }
            };

            let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    // let data = await response.data;
                    if(data.Success==true && data.Data=="2000")
                    {                        
                        console.log(true);
                    }
                    else{
                         if(data.ErrorList!=null && data.ErrorList.length>0)
                         {
                            let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                            console.log(Errtext);
                         }

                    }


                }
                else{
                    console.log('no record found');

                }
             // return data;
            } catch (error) {
                console.log(error.message);       
             }
     }
    return (
        <div className="App">
            <Auth0Provider domain={auth0.domain} clientId={auth0.clientId} redirectUri={auth0.redirectUri}>
                <Provider store={store}>
                    {/* <Provider store={AppStore}> */}
                    <BrowserRouter basename={`/`}>
                        <Switch>
                            {/* <Route path={`${process.env.PUBLIC_URL}/login`} component={Signin} /> */}
                            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                            <Route path={`${process.env.PUBLIC_URL}/forgetPwd`} component={ForgetPwd} />
                            <Route path={`${process.env.PUBLIC_URL}/resetPwd`} component={ResetPwd} />
                            <Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />

                            <App >
                                <Nav/>
                            </App>

                            {/* {currentUser !== null || authenticated || jwt_token ?

                                <App UserType={UserType}>
                                    <Nav  UserType={UserType} />
                                </App>
                                :
                                <Redirect exact to={`${process.env.PUBLIC_URL}/login`} caseSensitive={false} />
                            } */}
                        </Switch>
                    </BrowserRouter>
                </Provider>
                {/* </Provider> */}
            </Auth0Provider>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();