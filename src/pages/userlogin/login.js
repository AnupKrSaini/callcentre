import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo-atulaya.png';
import man from '../../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from "react-router";
import { firebase_app, Jwt_token } from "../../data/config";
import { Login, LOGIN, YourName, Password, RememberMe, loginStatusL } from '../../constant';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ConnectionInstance from '../apisettings/ConnectionInstance';
import { object, string } from 'yup/lib/locale';
import SweetAlert from 'sweetalert2';
import { useHistory } from 'react-router';
import Loader from '../../components/common/loader';
import { Spinner } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
const Signin = ({ history }) => {
  
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const[IsLoader,setIsLoader]=useState(false);
    const navigate = useHistory();

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );

    useEffect(() => {

        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                event.stopPropagation();
                onSubmitLoginHandler(event);
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
        if (value !== null)
            localStorage.setItem('profileURL', value);
        else
            localStorage.setItem('profileURL', man);
    }, [value, username, password]);




    const loginWithJwt = async (username, password) => {

        try {
            if (username && password) {

                let url = ConnectionInstance + 'Users/GetVerifyApplicationUsers';
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: { UserName: username, Password: password, ModuleId: "1" }
                };

              setIsLoader(true);
                let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    if (data.Success == true) {
                        let ds = data.Data;
                        if (ds != null) {

                            localStorage.removeItem('Session');
                            localStorage.removeItem('LoggedInUser');
                            localStorage.removeItem('UName');
                            localStorage.removeItem('UserTypeName');
                            localStorage.removeItem('UserType');
                            localStorage.removeItem("currentUser");
                            localStorage.removeItem("MobileNo");
                            localStorage.removeItem("ExtenNo");


                            localStorage.setItem('Session', "Active");
                            localStorage.setItem('LoggedInUser', ds.UserId);
                            localStorage.setItem('UName', ds.UserName);
                            localStorage.setItem('UserTypeName', ds.UserTypeName);
                            localStorage.setItem('UserType', ds.UserTypeId);
                            localStorage.setItem("MobileNo",ds.MobileNo);
                            localStorage.setItem("ExtenNo",ds.ExtenNo);
                            localStorage.setItem("currentUser", true);
                            setValue(man);
                            localStorage.setItem('token', Jwt_token);



                            const UType = ds.UserTypeId;
                            if (UType === "1" || UType === "2") {

                                // navigate.push(`${process.env.PUBLIC_URL}/admin/dashboard`);
                                window.location.href = `${process.env.PUBLIC_URL}/admin/dashboard`;
                                setIsLoader(false);
                                //setLoderWork(false);

                            }
                            else if (UType === "3") {
                                //navigate.push( `${process.env.PUBLIC_URL}/user/dashboard`);
                                window.location.href = `${process.env.PUBLIC_URL}/user/dashboard`;
                                setIsLoader(false);
                                // setLoderWork(false);
                            }



                        }
                    }
                    else {
                        SweetAlert.fire({ title: "Wrong Credentials", text: "Unauthorized user!", icon: "info" });
                        // SweetAlert.fire({ title: "Wrong Credentials", text: "Enter correct username and password", icon: "info" });
                        setIsLoader(false);
                    }

                }
                else {

                    SweetAlert.fire({ title: "Wrong Credentials", text: "Enter correct username and password", icon: "info" });
                    setIsLoader(false);
                }
            }
            else {

                if (!username && !password) {
                    SweetAlert.fire({ title: "Incomplete Credentials", text: "Please enter Username and Password", icon: "warning" });
                    setIsLoader(false);
                }
                else if (!username) {
                    SweetAlert.fire({ title: "Incomplete Credentials", text: "Please enter Username", icon: "warning" });
                    setIsLoader(false);
                }
                else {

                    SweetAlert.fire({ title: "Incomplete Credentials", text: "Please enter Password", icon: "warning" });
                    setIsLoader(false);
                }
            }

        } catch (error) {

            console.log(error.message);
            SweetAlert.fire({ title: "Server Inaccessible!", text: "You may not be connected to a network or Unable to connect to a server", icon: "error" });
            setIsLoader(false);
        }
    }

    //   const onEnterPress = (e) => {
    //     if(e.keyCode == 13 && e.shiftKey == false) {
    //       e.preventDefault();
    //       e.stopPropagation();
    //       onSubmitLoginHandler(e);
    //     }
    //   }


    const onSubmitLoginHandler = (e) => {
        e.preventDefault();
        loginWithJwt(username, password);

    }
    return (
        <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                       
                                        <div className="signinLogoHeader">
                                            <img src={logo} alt="" />
                                            <div className='logoTagLine'>Imaging <span>&amp;</span> Laboratories</div>
                                        </div>
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
                                                            value={username}
                                                            onChange={e => setusername(e.target.value)}
                                                            placeholder="User name"
                                                        />

                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">{Password}</label>
                                                        <input className="form-control" type="password" name="password"
                                                            value={password}
                                                            onChange={e => setPassword(e.target.value)}  placeholder="password" />

                                                    </div>
                                                    <div className="checkbox p-0">
                                                        <input id="checkbox1" type="checkbox" />
                                                        <label htmlFor="checkbox1">{RememberMe}</label>
                                                    </div>
                                                    <div className="form-group form-row mt-3 mb-0  styles">
                                                        <button className="btn btn-primary btn-block" type="button" onClick={(e) => { onSubmitLoginHandler(e) }}   >{IsLoader?<Spinner animation="border" size='sm' />:null}   {Login}</button>
                                                       
                                                    </div>


                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    {/* <!-- login page end--> */}
                </div>
            </div>

        </div>
    );
};

export default withRouter(Signin);