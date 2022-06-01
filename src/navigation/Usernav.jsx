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

import { Auth0Provider } from '@auth0/auth0-react'
//*******Component *//
import Dashboard from '../pages/user/dashboard';
import Assignedcalls from '../pages/user/outbound/assignedcalls';
import Unassignedcalls from '../pages/user/outbound/unassignedcalls';
import AddAssignCalls from '../pages/user/outbound/addassigncalls';

 
const Usernav= () => {
        return (
    
            <>
           {/* dashboard menu */}
           <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                                            return (<Redirect to={`${process.env.PUBLIC_URL}/user/dashboard`} />)
                                        }} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/user/dashboard`} caseSensitive={false} component={Dashboard} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/user/outbound/assignedcalls`} caseSensitive={false}  component={Assignedcalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/user/outbound/unassignedcalls`} caseSensitive={false}  component={Unassignedcalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/user/outbound/addassigncalls`} caseSensitive={false}  component={AddAssignCalls} />
                                                 </>
        )
  
    
    
}

export default Usernav;