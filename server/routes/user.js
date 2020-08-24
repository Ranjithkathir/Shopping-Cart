import express from 'express';
const bcrypt = require('bcryptjs');
const { check, validator, validationResult } = require('express-validator');
import User from '../model/User';
import { getToken } from '../util';
import { isAuth } from '../middleware/auth';

const router = express.Router();

// @route   POST api/users/login
// @desc    Login Route
// @access  Public

router.post("/login", [
    check('email', 'User Email is required').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let loginUser = await User.findOne({
            email: req.body.email
        });

        if (!loginUser) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(req.body.password, loginUser.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        if (loginUser) {
            res.send({
                token: getToken(loginUser)
            })
        } else {
            res.status(401).send({ msg: 'Invalid Email or Password.' })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route   POST api/users/register
// @desc    Register Route
// @access  Public

router.post("/register", [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check('password', 'Please enter a password atleast 6 characters').isLength({
        min: 6,
    }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        if (user) {
            res.send({
                token: getToken(user)
            })
        } else {
            res.status(401).send({ msg: 'Invalid User Details.' })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

router.get("/createadmin", async (req, res) => {

    try {
        const user = new User({
            name: 'Ranjith',
            email: 'ranjith.rk@cgvakindia.com',
            password: 'test123',
            isAdmin: true
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const newUser = await user.save();

        res.send(newUser);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route   GET api/users/getauthuser
// @desc    Loggin In User details
// @access  Private

router.get('/getauthuser', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        res.json(user);
    } catch (err) {

        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/updateuser
// @desc    Updating User PRofile
// @access  Private

router.put('/updateuser', [
    isAuth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Provide a valid email').isEmail()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email } = req.body;

    const profileFields = {};
    profileFields.id = req.user;
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;

    try {
        let user = await User.findOne({ _id: req.user });

        if (user) {
            user = await User.findOneAndUpdate({ _id: req.user }, { $set: profileFields }, { new: true })
        }

        return res.json(user);
    } catch (err) {
        console.log(err.message);
        res.statue(500).send('Server Error');
    }
});

// @route   DELETE api/users/deleteuser
// @desc    Deleting User PRofile
// @access  Private

router.delete('/deleteuser', [isAuth], async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.user });

        res.json({ msg: "User Deleted Successfully" });

    } catch (err) {
        console.log(err.message);
        res.statue(500).send('Server Error');
    }
})

export default router;