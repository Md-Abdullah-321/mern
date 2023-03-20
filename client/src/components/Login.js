import React, { useState , useContext} from 'react';
import { NavLink , useNavigate} from 'react-router-dom';
import loginpic from "../images/login.svg";
import { userContext } from '../App';

const Login = () => {
    const {state, dispatch} = useContext(userContext);


    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userLogIn = async(e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,password
            })
        });

        const data = await res.json();
        if(data.error){
            window.alert("Invalid Credentials");
        }else{
            dispatch({type: "USER", payload: true});
            window.alert("Login Successfull");
            //Sendig user to Home Page.
            navigate("/");
        }
    }
    return (
        <>
            <section className="sign-in">
                    <div className='container mt-5'>
                        <div className='sign-in-content'>
                        <div className='sign-in-image'>
                                        <figure>
                                            <img src={loginpic} alt='login Pic' />
                                        </figure>

                                        <NavLink to='/signup' className='sign-in-image-link'>Create an Account</NavLink>
                            </div>
                            <div className='sign-in-form'>
                                <h2 className='form-title'>Sign In</h2>
                                    <form className='register-form' id='register-form' method='POST'>

                                        <div className='form-group'>
                                            <label htmlFor='email'>
                                            <span className="mdi mdi-email-variant"></span>
                                            </label>
                                            <input type='email' name='email' id='email' autoComplete='off' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter Your Email'/>
                                        </div>
                            
                                        
                                        <div className='form-group'>
                                            <label htmlFor='password'>
                                            <span className="mdi mdi-lock"></span>
                                            </label>
                                            <input type='password' name='password' id='password' autoComplete='off'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Enter Password'/>
                                        </div>

                                        <div className='form-group form-button'>
                                            <input type='submit' name='signin' id='signin' className='form-submit' value='Sign In' onClick={userLogIn} />
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    )
}

export default Login;