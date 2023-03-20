import React, {useEffect, useState} from 'react';

const Contact = () => {


    const userContact = async() => {
        try{
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setUserData({...userData, name: data.name, email: data.email, phone: data.phone});

            if(data.error){
                throw new Error(res.error);
            }
        }catch(err){
            console.log(err);
        }
    }

    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    useEffect(() => {
        userContact();
    }, []);

    //Store data in States:
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value});
    }

    //Send data to Backend:
    const submitForm = async(e) => {
        e.preventDefault();

        const {name, email, phone, message} = userData;

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });
        const data = await res.json();
        console.log(data);

        if(data.error){
            window.alert("Message Not Sent.");
        }else{
            window.alert("Message Sent Successfully");

            setUserData({...userData, message: " "})
        }
    }

    return (
        <>
            <div className='contact_info'>
                <div class='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1 d-flex justify-content-around'>
                            {/* phone number  */}
                            <div className='contact_info_item'>
                            <span class="mdi mdi-cellphone"></span>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Phone
                                   </div>
                                   <div className='contact_info_text'>
                                        +880 1645 739121
                                   </div>
                                </div>
                            </div>

                            <div className='contact_info_item '>
                            <span class="mdi mdi-email-outline"></span>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Email
                                   </div>
                                   <div className='contact_info_text'>
                                        abdullah.dev.it@gmail.com
                                   </div>
                                </div>
                            </div>

                            <div className='contact_info_item'>
                            <span class="mdi mdi-cellphone"></span>
                                <div className='contact_info_content '>
                                    <div className='contact_info_title'>
                                        Address
                                   </div>
                                   <div className='contact_info_text'>
                                        Gazipur, Dhaka, Bangladesh
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* contact us form  */}
            <div className='contact_form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1'>
                            <div className='contact_form_container py-5'>
                                <div className='contact_form_title'>
                                    GET IN TOUCH
                                </div>

                                {/* contact form  */}
                                <form id='contact_form' method='POST'>
                                    <div className='contact_form_name d-flex justify-content-between align-items-between contact_form_cover'>
                                        <input type='text' id='contact_form_name' className='contact_form_name'placeholder='Your Name' value={ userData.name }
                                        onChange={handleInputs}
                                        name = 'name'
                                        required='true'/>
                                        <input type='email' id='contact_form_email' className='contact_form_email'placeholder='Your Email' value={ userData.email }
                                        onChange={handleInputs} 
                                        name = 'email'
                                        required='true'/>
                                        <input type='number' id='contact_form_phone' className='contact_form_phone'placeholder='Your Phone Number' value={ userData.phone }
                                        onChange={handleInputs}
                                        name = 'phone'
                                        required='true'/>
                                    </div>

                                    <div className='contact_form_text'>
                                        <textarea className='text_field contact_form_message' placeholder=' Message' cols='100' rows='8' 
                                        value={userData.message}
                                        onChange={handleInputs} 
                                        name = 'message'
                                        />
                                    </div>

                                    <div className='contact_form_button'>
                                        <button type='submit' className='button contact_submit_button' onClick={submitForm}>Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;