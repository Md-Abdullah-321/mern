import React, {useEffect, useState} from 'react';

const Home = () => {
    const [userName, setUserName] = useState(" ");
    const homePage = async() => {
        try{
            const res = await fetch("/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setUserName(data.name);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        homePage();
    }, []);

    return (
        <>
            <div className='home-page'>
                <div className='home-div'>
                <p>WELCOME</p>
                <h1>{userName}</h1>
                <h2>{userName? "Happy, to see you back": "We Are The MERN Developers."}</h2>
                </div>
            </div>
        </>
    )
}

export default Home;