const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');
const authenticateUser = require('../middleware/authenticateUser');
 

//create application:
const jsonParser = bodyParser.json();

// parse application/json
app.use(bodyParser.json())

require('../db/connection');
const User = require('../model/userSchema');


router.get('/', (req,res) => {
    res.send('Hello world, This is Router Page.');
});


// Registration Routing:
router.post('/register',jsonParser, async(req,res) => {
    const {name ,email ,phone,work ,password ,cpassword} = req.body;
    
    if(!name|| !email|| !phone|| !work|| !password|| !cpassword){
        return res.status(422).json({error: 'Please, filled the field properly.'});
    }

    try{
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error: 'Email Already Exist'});
        }else if(password != cpassword){
            return res.status(422).json({error: 'Password are not matched.'});
        }else{
            const user = new User({name,email,phone,work,password,cpassword});

            await user.save();
            res.status(201).json({message: 'User registered successfully.'}); 
        } 
    }catch(err){
        console.log(err)
    } 
});

// Login Routing:
router.post('/signin',jsonParser, async(req,res) => {
    
    try{
        const {email,password} = req.body;
        const userLogin = await User.findOne({email: email});
        
        if(!email || !password){
            return res.status(400).json({error: 'Please, fill the data'});
        }
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if(!isMatch){
                res.status(400).json({error: 'Invalid Credientials'});
            }else{
                res.json({message: 'User SignIn successfully'});
            }
        }else{
            res.status(400).json({error: 'Invalid Credientials.'});
        }
        


    }catch(err){
        console.log(err);
    }
});


// About Us Page Authentication: 
router.get('/about', authenticateUser ,(req,res) => {
    res.send(req.rootUser);
});

//Get UserData for Home and Contact Page.
router.get('/getData', authenticateUser, (req,res) => {
    res.send(req.rootUser);
});

//Sending Message from Contact Page:
router.post('/contact',authenticateUser,jsonParser, async(req,res) => {
    try{
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            return res.json({error: "Please, filled the contact form"})
        }

        const userContact = await User.findOne({_id:req.userID});


        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({message: "Message Sent successfully"});
        }else{
            console.log(err);
        }
    }catch(err){
        console.log(err);
    }
});

//Logout page Routing: 
router.get('/logout',(req,res) => {
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send("I am from logout");
});

module.exports = router;