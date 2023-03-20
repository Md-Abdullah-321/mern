import React, { useState } from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import signpic from "../images/signup.svg";


const Signup = () => {

    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"", email:"", phone:"", work:"", password:"", cpassword:""
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name] :value});
    };

    // function to send data to Backend 
    const PostData = async(e) => {
        e.preventDefault();

        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();
        if(data.error){
            window.alert("Invalid Registration");
        }else{
            window.alert("Registration Successfull");
            //Sendig user to login Page.
            navigate("/login");
        }
    };

    return (
        <>
            <section className="signup">
                    <div className='container mt-5'>
                        <div className='signup-content'>
                            <div className='signup-form'>
                                <h2 className='form-title'>Sign Up</h2>
                                    <form className='register-form' id='register-form' method='POST'>

                                       <div className='form-group'>
                                            <label htmlFor='name'>
                                            <span className="mdi mdi-account"></span>
                                            </label>
                                            <input type='text' name='name' id='name' autoComplete='off' 
                                            value={user.name} 
                                            onChange={handleInputs} 
                                            placeholder='Enter Your Name'/>
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='email'>
                                            <span className="mdi mdi-email-variant"></span>
                                            </label>
                                            <input type='email' name='email' id='email' autoComplete='off' 
                                            value={user.email} 
                                            onChange={handleInputs} 
                                            placeholder='Enter Your Email'/>
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label htmlFor='phone'>
                                            <span className="mdi mdi-phone-in-talk"></span>
                                            </label>
                                            <input type='number' name='phone' id='phone' autoComplete='off'
                                            value={user.phone} 
                                            onChange={handleInputs}  
                                            placeholder='Enter Your Number'/>
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='work'>
                                            <span className="mdi mdi-account-hard-hat-outline"></span>
                                            </label>
                                            <input type='text' name='work' id='work' autoComplete='off'
                         
                                            value={user.work} 
                                            onChange={handleInputs}  
                                            placeholder='Enter Your Profession'/>
                                        </div>
                                        
                                        <div className='form-group'>
                                            <label htmlFor='password'>
                                            <span className="mdi mdi-lock"></span>
                                            </label>
                                            <input type='password' name='password' id='password' autoComplete='off'
                                            
                                            value={user.password} 
                                            onChange={handleInputs}  
                                            placeholder='Enter Password'/>
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='cpassword'>
                                            <span className="mdi mdi-lock-check"></span>
                                            </label>
                                            <input type='password' name='cpassword' id='cpassword' autoComplete='off' 
                                            value={user.cpassword} 
                                            onChange={handleInputs}  
                                            placeholder='Confirm Password'/>
                                        </div>

                                        <div className='form-group form-button'>
                                            <input type='submit' name='signup' id='signup' className='form-submit' value='Sign Up' onClick={PostData}/>
                                        </div>
                                    </form>
                            </div>
                            <div className='signup-image'>
                                        <figure>
                                            <img src={signpic} alt='Registration Pic' />
                                        </figure>

                                        <NavLink to='/login' className='signup-image-link'>I am already register</NavLink>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}

export default Signup;