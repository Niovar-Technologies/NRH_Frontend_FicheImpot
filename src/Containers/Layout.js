import _logo from '../static/img/logobig.jpeg';
import clsx from 'clsx';
import search from "../static/img/search.png";
import avatar04 from "../static/img/avatar-04.jpg";
import profile from "../static/img/profile.jpg";
import avatar18 from "../static/img/avatar-18.jpg";
import avatar02 from "../static/img/avatar-02.jpg";
import avatar03 from "../static/img/avatar-03.jpg";
import {useLocation, useNavigate} from "react-router-dom";
import {Home, Users, Database, Briefcase, FileText, RefreshCw, Settings, User, Bell} from 'react-feather';
import {useEffect, useState} from "react";

const Layout = ({children}) => {

    const navigate = useNavigate()
    const location = useLocation();

    const fiche_impot_paths = ['/'];

    const historique_fiche_paths = ['/historiqueFI/'];


    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggle_sidebar = () => {
        // setSidebarOpen(!sidebarOpen)
    }

    useEffect(() => {
        console.log(location.pathname)
    }, [])

    return (
        <div className={clsx("main-wrapper dashboard", sidebarOpen && "slide-nav")}>
            <div className="header">
                <div className="header-left">
                    <a href="javascript:void(0);" className="toggle" id="toggle_btn">
                        <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <a href="#" className="logo">
                        <img src={_logo} alt="Logo"/>
                    </a>
                    <a onClick={() => {
                        window.location.href = "/"
                    }} className="logo logo-small">
                        <img src={_logo} alt="Logo" width="30" height="30"/>
                    </a>
                </div>


                <div className="top-nav-search">
                    <form>
                        <input placeholder={""} className={'form-control'}/>
                        <button className="btn" type="submit"><img src={search} alt="search"/>
                        </button>
                    </form>
                </div>


                <a className="mobile_btn" id="mobile_btn" onClick={toggle_sidebar}>
                    <span><i className="fas fa-bars"/></span>
                </a>


                <ul className="nav user-menu">

                    <li className="nav-item dropdown">
                        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                            <Bell style={{color: "white"}}/> <span className="badge badge-pill"/>
                        </a>
                        <div className="dropdown-menu notifications">
                            <div className="topnav-dropdown-header">
                                <span className="notification-title">Notifications</span>
                                <a href="javascript:void(0)" className="clear-noti"> Clear All</a>
                            </div>
                            <div className="noti-content">
                                <ul className="notification-list">
                                    <li className="notification-message">
                                        <a>
                                            <div className="media">
                                                <span className="avatar avatar-sm">
                                                    <img className="avatar-img rounded-circle" alt=""
                                                         src={avatar02}/>
                                                </span>
                                                <div className="media-body">
                                                    <p className="noti-details">
                                                        <span className="noti-title">Brian Johnson</span>
                                                        paid the invoice
                                                        <span className="noti-title">#DF65485</span>
                                                    </p>
                                                    <p className="noti-time"><span className="notification-time">4 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a>
                                            <div className="media">
                                        <span className="avatar avatar-sm">
                                        <img className="avatar-img rounded-circle" alt=""
                                             src={avatar03}/>
                                        </span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">Marie Canales</span> has
                                                        accepted your estimate <span
                                                            className="noti-title">#GTR458789</span></p>
                                                    <p className="noti-time"><span className="notification-time">6 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a>
                                            <div className="media">
                                                <div className="avatar avatar-sm">
                                            <span className="avatar-title rounded-circle bg-primary-light"><i
                                                className="far fa-user"/></span>
                                                </div>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">New user registered</span>
                                                    </p>
                                                    <p className="noti-time"><span className="notification-time">8 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a>
                                            <div className="media">
                                        <span className="avatar avatar-sm">
                                        <img className="avatar-img rounded-circle" alt=""
                                             src={avatar04}/>
                                        </span>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">Barbara Moore</span>
                                                        declined the invoice <span
                                                            className="noti-title">#RDW026896</span></p>
                                                    <p className="noti-time"><span className="notification-time">12 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="notification-message">
                                        <a>
                                            <div className="media">
                                                <div className="avatar avatar-sm">
                                            <span className="avatar-title rounded-circle bg-info-light"><i
                                                className="far fa-comment"/></span>
                                                </div>
                                                <div className="media-body">
                                                    <p className="noti-details"><span className="noti-title">You have received a new message</span>
                                                    </p>
                                                    <p className="noti-time"><span className="notification-time">2 days ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/*<div className="topnav-dropdown-footer">*/}
                            {/*    <a href="activities.html">View all Notifications</a>*/}
                            {/*</div>*/}
                        </div>
                    </li>

                    <li className="nav-item dropdown baggage">
                        <a href="#" className="dropdown-toggle nav-link " data-toggle="dropdown">
                            <Briefcase style={{color: "white"}}/>
                        </a>
                    </li>

                    <li className="nav-item dropdown has-arrow main-drop">
                        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                            <span className="user-img">
                                <img src={profile} alt=""/>
                                <span className="status online"/>
                            </span>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" onClick={() => {
                                navigate('/profile/')
                            }}><i data-feather="user"
                                  className="mr-1"/> Profile</a>
                            <a className="dropdown-item" onClick={() => {
                                navigate('/settings/')
                            }}><i data-feather="settings"
                                  className="mr-1"/> Settings</a>
                            <a className="dropdown-item"><i data-feather="log-out"
                                                            onClick={() => {
                                                                navigate('/login/')
                                                            }}
                                                            className="mr-1"/> Logout</a>
                        </div>
                    </li>

                </ul>

                <div className="dropdown mobile-user-menu show">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-v"/>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right ">
                        <a className="dropdown-item" onClick={() => {
                            navigate('/profile/')
                        }}>My Profile</a>
                        <a className="dropdown-item" onClick={() => {
                            navigate('/settings/')
                        }}>Settings</a>
                        <a className="dropdown-item"
                           onClick={() => {
                               navigate('/login/')
                           }}
                        >Logout</a>
                    </div>
                </div>

            </div>

            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll" style={{overflowY: "auto"}}>
                    <div className="sidebar-contents">
                        <div id="sidebar-menu" className="sidebar-menu">
                            <div className="mobile-show">
                                <div className="offcanvas-menu">
                                    <div className="user-info align-center bg-theme text-center">
                                        <span className="lnr lnr-cross text-white close_sidenav"
                                              id="mobile_btn_close">X</span>
                                        <a href="javascript:void(0)" className="d-block menu-style text-white">
                                            <div className="user-avatar res-profile mr-3">
                                                <img src={avatar18} alt="user avatar"
                                                     className="rounded-circle" width="50"/>
                                                <div className="sidebar-profile-content">
                                                    <h3>Kavin Hansen</h3>
                                                    <span>Admin</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="sidebar-input">
                                    <div className="top-nav-search">
                                        <form>
                                            <input type="text" className="form-control" placeholder="Search here"/>
                                            <button className="btn" type="submit"><i
                                                className="fas fa-search"/></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-profile">
                                <a className="sidebar-profile-img" onClick={() => {
                                    navigate('/profile/')
                                }}>
                                    <img src={profile} alt="profile-img"/>
                                    <div className="sidebar-profile-content">
                                        <h3>Kavin Hansen</h3>
                                        <span>Admin</span>
                                    </div>
                                </a>
                            </div>
                            <ul>
                                <li className={fiche_impot_paths.includes(location.pathname) && "active"}
                                    id="sidebar-item">
                                    <a onClick={() => {
                                        window.location.href = "/"
                                    }}><Home/><span>Fiche d'impot</span></a>
                                </li>
   
                                <li className={historique_fiche_paths.includes(location.pathname) && "active"} id="sidebar-item">
                                    <a onClick={() => {
                                        navigate('/historiqueFI/')
                                    }}><User/><span>Historique fiche impot</span></a>
                                </li>
                               
                        
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{minHeight:"100%", position:"relative"}}>
                <div style={{paddingBottom: "100px"}}>
                    {children}
                </div>
                <div className={"footer"} style={{height: 100, width: "100%", backgroundColor: "#000032", position:"absolute", bottom:0, left:0}}>

                </div>

            </div>

        </div>
    );
}

export default Layout;