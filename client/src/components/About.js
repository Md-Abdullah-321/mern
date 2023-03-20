import React, {useEffect, useState} from 'react';
import biopic from "../images/DSC_0167.svg";
import {useNavigate} from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const callAboutPage = async() => {
        try{
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();
            setUserData(data);

            if(data.error){
                throw new Error(res.error);
            }
        }catch(err){
            navigate("/login");
        }
    }

    const [userData, setUserData] = useState({});
    useEffect(() => {
        callAboutPage();
    }, []);

    return (
        <>
            <div className='container emp-profile'>
                <form method='GET'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={biopic} alt='Bio Pic' />
                        </div>

                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5> { userData.name }</h5>
                                <h6>{ userData.work }</h6>

                                <ul className="nav nav-tabs" role='tablist'>
                                    <li className="nav-item">
                                        <a className="nav-link active" id='home-tab' data-toggle='tab' href="#home" role='tab' aria-labelledby='home-tab'>About</a>
                                    </li>
                                    <li className="nav-item">
                                    <a className="nav-link" id='profile-tab' data-toggle='tab' href="#profile" role='tab' aria-labelledby='profile-tab'>Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-2'>
                            <input type='submit' className='profile-edit-btn' name='btnAddMore' value='Edit Profile'/>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='row' id='about-icons'>
                                <div className='col-md-6'>
                                    <div className='about-icon'>
                                        <a href='https://www.facebook.com/profile.php?id=100086184884085' target="_blank"><span className="mdi mdi-facebook"></span></a>
                                    </div>

                                    <div className='about-icon'>
                                        <a href='https://twitter.com/MdAbdul65419994' target="_blank"><span className="mdi mdi-twitter"></span></a>
                                    </div>

                                    <div className='about-icon'>
                                        <a href='https://www.linkedin.com/in/md-abdullah-1907b8173/' target='_blank'><span className="mdi mdi-linkedin"></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* right side  */}
                        <div className='col-md-8 about-info'>
                            <div className='tab-content profile-tab' id='myTabContent'>
                                <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>User Id</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{ userData._id }</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{ userData.name }</p>
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Email</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{ userData.email }</p>
                                        </div>
                                    </div>
                                    

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Phone</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p><span>0</span>{ userData.phone }</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Profession</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>{ userData.work }</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='tab-pane fade' id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Experience</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Expert</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>5$/hr</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Total Project</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>10</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>English Level</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>Fluent</p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <label>Availability</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <p>24/7</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About;