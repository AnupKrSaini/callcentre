import React from 'react';
import { Link } from 'react-router-dom'
//import { LOCATIONS, Chandigarh, Jammu, Faridabad, Okhla, ShalimarBagh, Patiala, Panipat } from '../../constant'

const RightSidebar = () => {
    return (
        <div>
            <div className="right-sidebar" id="right_side_bar">
                <div className="container p-0">
                    <div className="modal-header p-l-20 p-r-20">
                        <div className="col-sm-8 p-0">
                            <h6 className="modal-title font-weight-bold">MANAGE ROLES</h6>
                        </div>
                        <div className="col-sm-4 text-right p-0"><i className="mr-2" data-feather="settings"></i></div>
                    </div>
                </div>
                {/*
                <div className="friend-list-search mt-0">
                    <input type="text" placeholder="search location" /><i className="fa fa-search"></i>
                </div>
                */}

                <div className="chat-box custom-scrollbar">
                    <div className="people-list friend-list">
                        <ul className="list">
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 1</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 2</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 3</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 4</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 5</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 6</div>
                                    </div>
                                </Link>
                            </li>
                            <li className="clearfix">
                                <Link>
                                    <div className="about">
                                        <div className="name">Role 7</div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSidebar; 