import React, { Fragment, useState } from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom'

const Breadcrumb = props => {
    const [UserType, SetUserType] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const [ActiveUser, SetActiveUser] = useState(localStorage.Session == undefined ? "" : localStorage.Session);
    const [LoginUser, SetLoginUser] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
   
    const breadcrumb = props;
    if (UserType === "1" || UserType === "2") {
        return (
            <Fragment>
                
                <div className="container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col">
                                <div className="page-header-left">
                                   <h3>{breadcrumb.title}</h3>
                                    <ol className="breadcrumb pull-right">
                                        <li className="breadcrumb-item">
                                            <Link to={`${process.env.PUBLIC_URL}/admin/dashboard`}>
                                                <Home />
                                            </Link>
                                        </li>
                                        {breadcrumb.title=='Dashboard'?'':<li className="breadcrumb-item">{breadcrumb.parent}</li> }
                                        
                                        <li className="breadcrumb-item active">{breadcrumb.title}</li>
                                    </ol>
                                </div>
                            </div>
                            {/* <!-- Bookmark Start--> */}
                             {/*<Bookmark /> uncomment if required*}
                            {/* <!-- Bookmark Ends--> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
     else{
        return (
            <Fragment>
                
                <div className="container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col">
                                <div className="page-header-left">
                                   <h3>{breadcrumb.title}</h3>
                                    <ol className="breadcrumb pull-right">
                                        <li className="breadcrumb-item">
                                            <Link to={`${process.env.PUBLIC_URL}/user/dashboard`}>
                                                <Home />
                                            </Link>
                                        </li>
                                        {breadcrumb.title=='Dashboard'?'':<li className="breadcrumb-item">{breadcrumb.parent}</li> }
                                        
                                        <li className="breadcrumb-item active">{breadcrumb.title}</li>
                                    </ol>
                                </div>
                            </div>
                            {/* <!-- Bookmark Start--> */}
                             {/*<Bookmark /> uncomment if required*}
                            {/* <!-- Bookmark Ends--> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
     }
   
}

export default Breadcrumb
