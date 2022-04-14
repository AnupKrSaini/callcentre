import React,{Fragment,useEffect,useState} from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import RightSidebar from './common/right-sidebar';
import Footer from './common/footer';
import { ToastContainer } from 'react-toastify';
import Loader from './common/loader';
import { useHistory } from 'react-router';
//import { useIdleTimer } from 'react-idle-timer';

const AppLayout = (props) => {
    const [currentUser, setCurrentUser] = useState(localStorage.currentUser == undefined ? false : localStorage.currentUser);
    const navigate = useHistory();



 
     
        return (
            <Fragment>
                <Loader />
                <div className="page-wrapper">
                    <div className="page-body-wrapper">
                        <Header />
                        <Sidebar />
                        {/* <RightSidebar /> */}
                        <div className="page-body">
                            { props.children }
                        </div>
                        <Footer />
                        {/*<ThemeCustomizer />*/}
                    </div>
                </div>
                <ToastContainer />
            </Fragment>
        );
}

export default AppLayout;