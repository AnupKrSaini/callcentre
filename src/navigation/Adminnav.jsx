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
import Dashboard from '../pages/admin/dashboard';
import Assignedcalls from '../pages/admin/outbound/assignedcalls';
import Unassignedcalls from '../pages/admin/outbound/unassignedcalls';
import AddAssignCalls from '../pages/admin/outbound/addassigncalls';
import UploadCalls from '../pages/admin/outbound/uploadcalls';
import VerifyManualSheets from '../pages/admin/outbound/verifymanualsheets';
import ApiManagement from '../pages/admin/apimanagement';
import AutomationCalls from '../pages/admin/outbound/automationcalls';
import PurposeManagement from '../pages/admin/purposemanagement';
import SourceManagement from '../pages/admin/sourcemanagement';
import TeamManagement from '../pages/admin/teammanagement';
import ViewAssignCalls from '../pages/admin/outbound/viewassignedcalls';
import AddComplaintCalls from '../pages/admin/addcomplaintcalls';
import ViewComplaintCall from '../pages/admin/viewcomplaintcall';  
import ReAssignedCalls from '../pages/admin/outbound/reassignedcalls';
import ViewReAssignedCalls from '../pages/admin/outbound/viewreassignedcalls';
import PbxUserExtensionmaster from '../pages/admin/pbxUserExtensionmaster';
 import PbxcallType from '../pages/admin/pbxcallType';

const Nav= () => {

        return (
    
            <>
           {/* dashboard menu */}
           <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                                            return (<Redirect to={`${process.env.PUBLIC_URL}/admin/dashboard`} />)
                                        }} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/dashboard`} caseSensitive={false} component={Dashboard} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/assignedcalls`} caseSensitive={false}  component={Assignedcalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/unassignedcalls`} caseSensitive={false}  component={Unassignedcalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/addassigncalls`} caseSensitive={false}  component={AddAssignCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/uploadcalls`} caseSensitive={false}  component={UploadCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/verifymanualsheets`} caseSensitive={false}  component={VerifyManualSheets} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/apimanagement`} caseSensitive={false}  component={ApiManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/automationcalls`} caseSensitive={false}  component={AutomationCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/purposemanagement`} caseSensitive={false} component={PurposeManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/sourcemanagement`} caseSensitive={false} component={SourceManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/teammanagement`} caseSensitive={false} component={TeamManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/viewassignedcalls`} caseSensitive={false} component={ViewAssignCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/addcomplaintcalls`} caseSensitive={false} component={AddComplaintCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/viewcomplaintcall`} caseSensitive={false} component={ViewComplaintCall} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/reassignedcalls`} caseSensitive={false} component={ReAssignedCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/outbound/viewreassignedcalls`} caseSensitive={false} component={ViewReAssignedCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/pbxUserExtensionmaster`} caseSensitive={false} component={PbxUserExtensionmaster} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/admin/PbxcallType`} caseSensitive={false} component={PbxcallType} />
                             
                                       {/*     
                                        <Route exact  path={`${process.env.PUBLIC_URL}/pages/admin/UploadCalls`}  caseSensitive={false} component={UploadCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/AutomationCalls`} caseSensitive={false} component={AutomationCalls} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/UnassignedLeads`} caseSensitive={false} component={UnassignedLeads} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/UserManagement`} caseSensitive={false} component={UserManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/RoleManagement`} caseSensitive={false} component={RoleManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/PurposeManagement`} caseSensitive={false} component={PurposeManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/SourceManagement`} caseSensitive={false} component={SourceManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/TeamManagement`} caseSensitive={false} component={TeamManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/DepartmentManagement`} caseSensitive={false} component={DepartmentManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/ApiManagement`} caseSensitive={false} component={ApiManagement} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/AddOutboundCalling`}  caseSensitive={false} component={AddOutboundCalling} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/admin/ManageOutboundCalling`}  caseSensitive={false} component={ManageOutboundCalling} />
                                        
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/reports/CancelReport`} caseSensitive={false} component={CancelReport} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/reports/CollectionReportUserWise`} caseSensitive={false} component={CollectionReportUserWise} />
                                        <Route exact path={`${process.env.PUBLIC_URL}/pages/reports/LogReport`} caseSensitive={false} component={LogReport} />
    
                                        <Route  exact path={`${process.env.PUBLIC_URL}/pages/master/GetResult`} caseSensitive={false} component={GetResult} /> */}
    
            </>
        )
 
    
}

export default Nav;