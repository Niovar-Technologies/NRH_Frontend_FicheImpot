import Layout from "../Containers/Layout";
import group from '../static/img/group.png';
import company from '../static/img/company.png';
import _case from '../static/img/case.png';
import money from '../static/img/money.png';
import avatar07 from '../static/img/avatar-07.jpg';
import avatar15 from '../static/img/avatar-15.jpg';
import avatar12 from '../static/img/avatar-12.jpg';
import avatar11 from '../static/img/avatar-11.jpg';
import avatar09 from '../static/img/avatar-09.jpg';
import {RotateCw} from "react-feather";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <Layout>

            <div className="page-wrapper">
                <div className="content container-fluid">

                    <div className="row">
                        <div className="col-xl-9 col-sm-12 col-12 d-flex">
                            <div className="col-xl-12 col-sm-12 col-12 flex-fill p-0">
                                <div className="row ">
                                    <div className="col-xl-12 col-sm-12 col-12 pr-0">
                                        <div className="breadcrumb-path ">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><a onClick={() => {navigate('/')}}>Home</a>
                                                </li>
                                                <li className="breadcrumb-item active">Dashboard</li>
                                            </ul>
                                            <h3>Admin Dashboard</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-xl-3 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle1">
                                                <div className="dash-content ">
                                                    <span><img src={group} alt="dashboard"/></span>
                                                    <label>Employees</label>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 36" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="80, 100"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">600</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle2">
                                                <div className="dash-content ">
                                                    <span><img src={company} alt="dashboard"/></span>
                                                    <label>Companies</label>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 35" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9153 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="70, 100"
                                                              d="M18 2.0843 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">30</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle3">
                                                <div className="dash-content ">
                                                    <span><img src={_case} alt="dashboard"/></span>
                                                    <label>Leaves</label>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 35" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9153 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="70, 100"
                                                              d="M18 2.0843 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">3</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle4">
                                                <div className="dash-content ">
                                                    <span><img src={money} alt="dashboard"/></span>
                                                    <label>Salary</label>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 35" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9153 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="70, 100"
                                                              d="M18 2.0843 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">$5.8M</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-xl-4 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle5">
                                                <div className="dash-content ">
                                                    <label>Total Application</label>
                                                    <h3>45,675</h3>
                                                    <p><i data-feather="arrow-up" className="mr-2"/>+1.4%</p>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 36" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="80, 100"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">85%</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle6">
                                                <div className="dash-content ">
                                                    <label>Shortlisted</label>
                                                    <h3>30,175</h3>
                                                    <p><i data-feather="arrow-up" className="mr-2"/>+1.8%</p>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 36" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="60, 100"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">60%</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-sm-6 col-12 d-flex pr-0">
                                        <div className="card  flex-fill">
                                            <div className="card-body contentcard circle3">
                                                <div className="dash-content ">
                                                    <label>Rejected</label>
                                                    <h3>30,175</h3>
                                                    <p><i data-feather="arrow-down" className="mr-2"/>-2.4%</p>
                                                </div>
                                                <div className="dash-circle">
                                                    <svg viewBox="0 0 36 36" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="25, 100"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">25%</text>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-12 col-12 d-flex">
                            <div className="card flex-fill">
                                <div className="dashboard-profile">
                                    <div className="dash-imgs text-center">
                                        <img src={avatar07} alt="profile"/>
                                        <label>Welcome Admin</label>
                                        <span>Sun, 29 Nov 2019</span>
                                    </div>
                                    <div className="dash-btns">
                                        <a className="btn btn-dashboard active">Admin Dashboard</a>
                                        <a className="btn btn-dashboard" onClick={() => {window.location.href = "/employee-dashboard/"}}> Employees
                                            Dashboard</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-3 col-sm-12 col-12 d-flex pr-0">
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <h2 className="card-title">Total Employees</h2>
                                </div>
                                <div className="card-body p-0">
                                    <div id="polarchart"/>
                                    <div className="employee-chart">
                                        <div className="invoice-chart-list charts1">
                                            <h5>Business</h5>
                                        </div>
                                        <div className="invoice-chart-list charts2">
                                            <h5>Design</h5>
                                        </div>
                                        <div className="invoice-chart-list charts3">
                                            <h5>Development</h5>
                                        </div>
                                        <div className="invoice-chart-list charts4">
                                            <h5>Testing</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-12 col-12 d-flex pr-0">
                            <div className="card card-list flex-fill">
                                <div className="card-header">
                                    <h2 className="card-title">Project Status</h2>
                                    <div className="col-xl-4 col-sm-6 col-12 p-0">
                                        <div className="form-group m-0 select-das">
                                            <select className="select">
                                                <option value="active" selected>This Year</option>
                                                <option value="inactive">2021</option>
                                                <option value="inactive">2020</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div id="invoice_chart"/>
                                    <div className="invoice-chart-details">
                                        <div className="donut-chart-list charts1">
                                            <h5>Rejected</h5>
                                            <label>3,782</label>
                                            <span>68%</span>
                                        </div>
                                        <div className="donut-chart-list charts2">
                                            <h5>Finalised</h5>
                                            <label>4,678</label>
                                            <span>55%</span>
                                        </div>
                                        <div className="donut-chart-list charts3">
                                            <h5>On hold</h5>
                                            <label>2,175</label>
                                            <span>45%</span>
                                        </div>
                                        <div className="donut-chart-list charts4">
                                            <h5>Shortlisted</h5>
                                            <label>1,516</label>
                                            <span>34%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-sm-12 col-12 d-flex">
                            <div className="card card-list flex-fill">
                                <div className="card-header">
                                    <h2 className="card-title">Total Salary By Unit</h2>
                                    <div className="col-xl-3 col-sm-6 col-12 p-0">
                                        <div className="form-group m-0 select-das">
                                            <select className="select">
                                                <option value="active" selected>Marketing</option>
                                                <option value="inactive">Marketing</option>
                                                <option value="inactive">Marketing</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div id="chart"/>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-xl-4 col-sm-12 col-12 d-flex pr-0">
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <h2 className="card-title">Employee Structure</h2>
                                </div>
                                <div className="card-body p-1">
                                    <div className="radio-dash ">
                                        <ul>
                                            <li>
                                                <div className="dash-circle circle5">
                                                    <svg viewBox="0 0 36 36" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="80, 100"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">70%</text>
                                                    </svg>
                                                    <label>Male</label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="dash-circle circle2">
                                                    <svg viewBox="0 0 36 36" className="circular-chart ">
                                                        <path className="circle-bg"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <path className="circle" stroke-dasharray="30, 100"
                                                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                        <text x="18" y="20.35" className="percentage">30%</text>
                                                    </svg>
                                                    <label>Female</label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-12 col-12 d-flex pr-0">
                            <div className="card card-lists flex-fill">
                                <div className="card-header">
                                    <h2 className="card-title">Your Upcoming Leave</h2>
                                    <a><i className="fas fa-briefcase" /></a>
                                </div>
                                <div className="card-body p-0">
                                    <div className="leave-dash">
                                        <div className="leave-dates">
                                            <label>Mon, 16 Dec 2021</label>
                                            <span><i className="fas fa-briefcase" /></span>
                                        </div>
                                        <div className="leave-dates">
                                            <label>Fri, 20 Dec 2021</label>
                                            <span className="active"><i className="fas fa-briefcase" /></span>
                                        </div>
                                        <div className="leave-dates">
                                            <label>Wed, 25 Dec 2021</label>
                                            <span className="active"><i className="fas fa-briefcase" /></span>
                                        </div>
                                        <div className="leave-dates">
                                            <label>Fri, 27 Dec 2021</label>
                                            <span className="active"><i className="fas fa-briefcase" /></span>
                                        </div>
                                        <div className="leave-dates border-0">
                                            <label>Tue, 31 Dec 2021</label>
                                            <span className="active"><i className="fas fa-briefcase" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-12 col-12 d-flex">
                            <div className="card card-lists flex-fill">
                                <div className="card-header">
                                    <h2 className="card-title">Today</h2>
                                    <a><i data-feather="rotate-cw"/></a>
                                </div>
                                <div className="card-body p-1">
                                    <div className="leave-dash">
                                        <div className="leave-dates leave1">
                                            <label><span className="mr-3"> <i
                                                className="fas fa-birthday-cake " /></span>No Birthdays
                                                Today</label>
                                            <img src={avatar15} alt="profile"/>
                                        </div>
                                        <div className="leave-dates leave2">
                                            <label><span className="mr-3"><i className="fas fa-bed  " /></span>Ralph
                                                Baker is off sick
                                                today</label>
                                            <img src={avatar07} alt="profile"/>
                                        </div>
                                        <div className="leave-dates leave3">
                                            <label><span className="mr-3"><i className="fas fa-male  " /></span>Ralph
                                                Baker is
                                                parenting leave today</label>
                                            <img src={avatar12} alt="profile"/>
                                        </div>
                                        <div className="leave-dates leave4">
                                            <label><span className="mr-3"><i className="fas fa-briefcase  " /> </span>Danny
                                                ward is
                                                away today</label>
                                            <img src={avatar11} alt="profile"/>
                                        </div>
                                        <div className="leave-dates leave5 border-0">
                                            <label><span className="mr-3"><i className="fas fa-home  " /> </span> You
                                                are working from
                                                home today</label>
                                            <img src={avatar09} alt="profile"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl col-sm-12 col-12 d-flex pr-0">
                            <div className="card card-list flex-fill ">
                                <div className="card-header">
                                    <h2 className="card-title">ToDo List</h2>
                                </div>
                                <div className="card-body ">
                                    <div className="checkbox-path ">
                                        <ul>
                                            <li>
                                                <input type="checkbox" id="check1" checked/>
                                                <label htmlFor="check1"></label>
                                                <div className="dashboard-check">
                                                    <label className="strike">New Employee intro </label>
                                                    <span>SCHEDULED FOR 3:00 P.M. ON JUN 2021</span>
                                                </div>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="check2"/>
                                                <label htmlFor="check2"></label>
                                                <div className="dashboard-check">
                                                    <label>Send email to CEO</label>
                                                    <span>SCHEDULED FOR 4:30 P.M. ON JUN 2021</span>
                                                </div>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="check3"/>
                                                <label htmlFor="check3"></label>
                                                <div className="dashboard-check">
                                                    <label>New Joing Employee Welcome kit</label>
                                                    <span><a>John Smith</a> Designer</span>
                                                    <span><a>Hossein Shams</a> Developer</span>
                                                    <span><a>Mike Litorus iOS</a> Developer</span>
                                                </div>
                                            </li>
                                            <li>
                                                <input type="checkbox" id="check4"/>
                                                <label htmlFor="check4"></label>
                                                <div className="dashboard-check">
                                                    <label>Birthday Wish</label>
                                                    <span>SCHEDULED FOR 4:30 P.M. ON JUN 2021</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl col-sm-12 col-12 d-flex pr-0">
                            <div className="card card-lists flex-fill ">
                                <div className="card-header">
                                    <h2 className="card-title">Recent Activities</h2>
                                    <a><RotateCw /></a>
                                </div>
                                <div className="card-body p-1">
                                    <div className="activity-set">
                                        <div className="activity-img">
                                            <img src={avatar15} alt="avatar"/>
                                        </div>
                                        <div className="activity-content">
                                            <label>Lorem ipsum dolor sit amet, id id quo eruditi eloquentiam.</label>
                                            <span>Danny Ward | 1 hour ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-set">
                                        <div className="activity-img">
                                            <img src={avatar07} alt="avatar"/>
                                        </div>
                                        <div className="activity-content">
                                            <label>Lorem ipsum dolor sit amet, id id quo eruditi eloquentiam.</label>
                                            <span>Danny Ward | 1 hour ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-set">
                                        <div className="activity-img">
                                            <img src={avatar12} alt="avatar"/>
                                        </div>
                                        <div className="activity-content">
                                            <label>Lorem ipsum dolor sit amet, id id quo eruditi eloquentiam.</label>
                                            <span>Danny Ward | 1 hour ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-set">
                                        <div className="activity-img">
                                            <img src={avatar11} alt="avatar"/>
                                        </div>
                                        <div className="activity-content">
                                            <label>Lorem ipsum dolor sit amet, id id quo eruditi eloquentiam.</label>
                                            <span>Danny Ward | 1 hour ago</span>
                                        </div>
                                    </div>
                                    <div className="activity-set border-0">
                                        <div className="activity-img">
                                            <img src={avatar09} alt="avatar"/>
                                        </div>
                                        <div className="activity-content">
                                            <label>Lorem ipsum dolor sit amet, id id quo eruditi eloquentiam.</label>
                                            <span>Danny Ward | 1 hour ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-12 col-12 d-flex">
                            <div className="card card-list flex-fill ">
                                <div className="card-header">
                                    <h2 className="card-title">Team Leads</h2>
                                    <a className="manage-link">Manage Team</a>
                                </div>
                                <div className="card-body p-0">
                                    <div className="manage-set">
                                        <div className="manage-name">
                                            <label>John Gibbs</label>
                                            <span>PHP</span>
                                        </div>
                                        <div className="manage-img">
                                            <img src={avatar15} alt="profile"/>
                                        </div>
                                    </div>
                                    <div className="manage-set">
                                        <div className="manage-name">
                                            <label>Danny Ward</label>
                                            <span>Design</span>
                                        </div>
                                        <div className="manage-img">
                                            <img src={avatar07} alt="profile"/>
                                        </div>
                                    </div>
                                    <div className="manage-set">
                                        <div className="manage-name">
                                            <label>Linda Craver</label>
                                            <span>IOS</span>
                                        </div>
                                        <div className="manage-img">
                                            <img src={avatar12} alt="profile"/>
                                        </div>
                                    </div>
                                    <div className="manage-set">
                                        <div className="manage-name">
                                            <label>Jenni Sims</label>
                                            <span>Android</span>
                                        </div>
                                        <div className="manage-img">
                                            <img src={avatar11} alt="profile"/>
                                        </div>
                                    </div>
                                    <div className="manage-set border-0">
                                        <div className="manage-name">
                                            <label>Maria Cotton</label>
                                            <span>Business</span>
                                        </div>
                                        <div className="manage-img">
                                            <img src={avatar09} alt="profile"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    );
}

export default Dashboard;