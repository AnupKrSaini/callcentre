import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/images/logo-atulaya.png';
import man from '../../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router";
import { firebase_app, Jwt_token } from "../../data/config";
import { handleResponse } from "../../services/fack.backend";
import SweetAlert from 'sweetalert2';
import axios from 'axios';
import { Login, LOGIN, YourName, Password, RememberMe } from '../../constant';
import ConnectionInstance from '../apisettings/ConnectionInstance';

const Signin = () => {
    const [username, setUsername] = useState(localStorage.UserName == undefined ? "" : localStorage.UserName)
    const [password, setPassword] = useState(localStorage.Password == undefined ? "" : localStorage.Password)
    const [checkbox, setCheckbox] = useState(localStorage.CheckBox == undefined ? false : true);
   
    let usernameref = useRef();
    let passwordref = useRef();
    let btnLogin = useRef();

    const handleUserInput = (e) => {
        setUsername(e.target.value);
    };
    const handleUserInputPassword = (e) => {
        setPassword(e.target.value);
    };
    const handleCheckbox = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setCheckbox(true);
        } else {
            setCheckbox(false);
        }
    };
    useEffect(() => {
        localStorage.setItem('Session', "");
        var input1 = usernameref.current;
        var input2 = passwordref.current;
        input1.addEventListener("keyup", function (event) {
            if (event.key == undefined) {
                return false;
            }
            if (event.key.toLowerCase() === "enter") {
                event.preventDefault();
                btnLogin.current.click();
            }
        });
        input2.addEventListener("keyup", function (event) {
            if (event.key == undefined) {
                return false;
            }
            if (event.key.toLowerCase() === "enter") {
                event.preventDefault();
                btnLogin.current.click();
            }
        });
    }, [])
    const callLogin = async () => {
        let uType=1;

         if(uType===1)
         {
            localStorage.setItem('UserType', uType);
            window.location.assign(`${process.env.PUBLIC_URL}/admin/dashboard`);
         }
         else if(uType===2)
         {
            
            localStorage.setItem('UserType', uType);
            window.location.assign(`${process.env.PUBLIC_URL}/user/dashboard`);
         }
        
        // try {
        //     const requestOptions = {
        //         UserName: username, Password: password, ModuleId: "2"
        //     };
        //     if (username && password) {
        //         let url = ConnectionInstance + 'users/verifyuser'
        //         await axios.post(url, requestOptions).then((response) => {
        //             const data = response.data;
        //             if (data.Success) {
        //                 localStorage.clear();
        //                 if (checkbox == true) {
        //                     localStorage.setItem('UserName', username);
        //                     localStorage.setItem('Password', password);
        //                     localStorage.setItem('CheckBox', checkbox);
        //                 }
        //                 localStorage.setItem('Session', "Active");
        //                 localStorage.setItem('LoggedInUser', data.Data.UserId);
        //                 localStorage.setItem('CentreSNo', 251); //centerno is hardcoded for now
        //                 window.location.assign(`${process.env.PUBLIC_URL}/dashboard`);
        //             }
        //             else {
        //                 SweetAlert.fire({ title: "Wrong Credentials", text: "Enter correct email and password", icon: "info" });
        //             }
        //         }).catch(function (error) {
        //             if (error.response) {
        //                 ErrorFunction(error.response.status);
        //             }
        //         })
        //     }
        //     else {
        //         if (!username && !password) {
        //             SweetAlert.fire({ title: "Incomplete Credentials", text: "Please enter Username and Password", icon: "warning" });
        //         }
        //         else if (!username) {
        //             SweetAlert.fire({ title: "Incomplete Credentials", text: "Please enter Username", icon: "warning" });
        //         }
        //         else {
        //             SweetAlert.fire({ title: "Incomplete Credentials", text: "Please enter Password", icon: "warning" });
        //         }
        //     }
        // } catch (error) {
        //     SweetAlert.fire({ title: "Server Inaccessible!", text: "You may not be connected to a network or Unable to connect to a server", icon: "error" });
        // }
    }
    const ErrorFunction = async (ErrorCode) => {
        if (ErrorCode == "400")
            SweetAlert.fire({ title: "Error 400", text: "Bad request", icon: "error" })
        else if (ErrorCode == "401")
            SweetAlert.fire({ title: "Error 401", text: "Unauthorized", icon: "error" })
        else if (ErrorCode == "403")
            SweetAlert.fire({ title: "Error 403", text: "Forbidden", icon: "error" })
        else if (ErrorCode == "404")
            SweetAlert.fire({ title: "Error 404", text: "Page not found", icon: "error" })
        else if (ErrorCode == "500")
            SweetAlert.fire({ title: "Error 500", text: "Internal Server Error", icon: "error" })
        else if (ErrorCode == "503")
            SweetAlert.fire({ title: "Error 503", text: "Service Unavailable", icon: "error" })
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center" style={{ backgroundColor: '#ef4e57', padding: '10px' }}>
                                            <img src={logo} alt="" /></div>
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <div className="text-center">
                                                    <h4>{LOGIN}</h4>
                                                    <h6>{"Enter your Username and Password"} </h6>
                                                </div>
                                                <form className="theme-form" >
                                                    <div className="form-group">
                                                        <label className="col-form-label pt-0">{YourName}</label>
                                                        <input className="form-control" type="email" name="email"
                                                            value={username} onChange={handleUserInput}
                                                            placeholder="Email address"
                                                            ref={usernameref}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">{Password}</label>
                                                        <input className="form-control" type="password" name="password"
                                                            value={password} onChange={handleUserInputPassword}
                                                            placeholder="Password"
                                                            ref={passwordref}
                                                        />
                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" onClick={(e) => { handleCheckbox(e); }} checked={checkbox} />
                                                        <label htmlFor="checkbox1">{RememberMe}</label>
                                                    </div>
                                                    {/* <div className="form-group form-row mt-3 mb-0">
                                                        <button className="btn btn-primary btn-block" type="button" ref={btnLogin} onClick={callLogin} >{Login}</button>
                                                    </div> */}
                                                    <button className="btn btn-primary btn-block" type="button" onClick={() => callLogin()} >{Login}</button>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default withRouter(Signin);