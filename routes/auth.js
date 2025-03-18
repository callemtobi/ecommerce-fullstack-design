import { Router } from "express";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// ----------- GET Routes
router.get('/login', (req, res) => {
    res.render('login', {pageName: 'Login', pageRoute: 'login', passMessage: ''});
})
router.get('/register', (req, res) => {
    res.render('login', {pageName: 'Register', pageRoute: 'register', passMessage: 'Password must contain one of these characters "! - % - $"'});
})

// ----------- POST Routes
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email: email});
        if (!user) { res.status(401).json('User not found') }
        else if (user) { 
            const passDecrypt = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PHRASE).toString(CryptoJS.enc.Utf8);
            if (password !== passDecrypt) { res.status(401).json('Wrong password')}
            else { 
                console.log('------> Successfull login');
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                }, process.env.JWT_SECRET, {expiresIn: '1d'}
                )
                res.status(200).json({user, accessToken})
            } 
        }
    }
    catch (err) { console.log('Error: ' + err); }


    console.log(`Login details -> Email: ${email} | Password: ${password}`)
})
router.post('/register', (req, res) => {
    const {username, email, password} = req.body;
    const passEncrypt = CryptoJS.AES.encrypt(password, process.env.SECRET_PHRASE).toString();
    const user = new User({
        username: username,
        email: email,
        password: passEncrypt
    });

    User.findOne({$or: [{username: user.username}, {email: user.email}]})
    .then((userExists) => {
        if(!userExists) { 
            User.insertOne(user); 
            console.log('----> User registered'); 
            return res.redirect('/')
        } else if (userExists.username === user.username) {
            console.log('--> User with that username exists.');
            return res.redirect('/api/user/register');
        } else if (userExists.email === user.email) {
            console.log('--> User with that email exists.');
            return res.redirect('/api/user/register');
        } else { 
            console.log('-------->Error')
            return res.redirect('/api/user/register');
        }
    })
    .catch(err => {console.log('Error: ' + err);})
    
    console.log(`Registeration details -> Username: ${username} | Email: ${email} Password: ${user.password}`);
})

export default router;