import express from 'express';
import User from '../model/User';
import { getToken } from '../util';

const router = express.Router();

router.post("/login", async (req, res) => {

    try {
        const loginUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (loginUser) {
            res.send({
                _id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email,
                isAdmin: loginUser.isAdmin,
                token: getToken(loginUser)
            })
        } else {
            res.status(401).send({ msg: 'Invalid Email or Password.' })
        }
    } catch (err) {
        res.send({ msg: err.message });
    }

});

router.post("/register", async (req, res) => {

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const newUser = await user.save();

        if (newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        } else {
            res.status(401).send({ msg: 'Invalid User Details.' })
        }
    } catch (err) {
        res.send({ msg: err.message });
    }

})

router.get("/createadmin", async (req, res) => {

    try {
        const user = new User({
            name: 'Ranjith',
            email: 'ranjith.rk@cgvakindia.com',
            password: 'test123',
            isAdmin: true
        })

        const newUser = await user.save();

        res.send(newUser);

    } catch (err) {
        res.send({ msg: err.message });
    }

});

export default router;