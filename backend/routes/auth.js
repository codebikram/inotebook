const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//secret for JWT token
const JWT_SECRET = 'bikramis$goodboy';

//ROUTE 1: create user using POST: "api/auth/create-user" FOR SIGN UP
router.post('/create-user', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a vaild Email id').isEmail(),
    body('password', 'Password must have minimum 5 character').isLength({ min: 5 }),
], async (req, res) => {
    // if there are error, return bad request, error   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            //password hashing 
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);
            //save user data in mongodb
            let userData = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            })
            //jwt token generate and send it
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
        }
        else {
            return res.status(400).json({ error: "Sorry a user with this email alredy exists" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: LOGIN user using POST: "api/auth/login" FOR LOG IN USER
router.post('/login', [
    body('email', 'Enter a vaild Email id').isEmail(),
    body('password', 'Password field can not be empty').exists(),
], async (req, res) => {
    let success = false;
    // if there are error, return bad request, error   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let { email, password } = req.body;
        //find the user from db
        const user = await User.findOne({ email });
        if (user) {
            //check the password matched or not 
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (passwordCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authtoken = jwt.sign(data, JWT_SECRET);
                success = true;
                res.json({ success, authtoken });
            }
            else {
                return res.status(400).json({ success, error: "Please enter correct details" });
            }
        }
        else {
            return res.status(400).json({ success, error: "Please enter correct details" });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: get user details POST: "api/auth/getuser" FOR LOG IN USER
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;
