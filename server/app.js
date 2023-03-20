const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const express =  require('express');
const app = express();

dotenv.config({path: './config.env'});
require('./db/connection');
// const User = require('./model/userSchema');


// Cookie Parser: 
const cookieParser = require("cookie-parser");
app.use(cookieParser())

//Middlewares:(Connecting with Router Files)
app.use(require('./router/auth'));
app.use(express.json()); 


//Routing Start:
// app.get('/about', (req,res) => {
//     res.send('Hello world, This is about Me Page.');
// });

//Routing End:

if(process.env.NODE_ENV == 'production'){
    app.use(express.static("client/build"))
}

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running at Port no ${PORT}`);
})