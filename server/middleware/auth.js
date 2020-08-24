import jwt, { decode } from 'jsonwebtoken';
const dotenv = require('dotenv');
import config from '../config/default';

dotenv.config();

const isAuth = (req, res, next) => {
    // Get Token
    const token = req.header('x-auth-token');
    // Check Token Found or not
    if (!token) {
        return res.status(401).json({ msg: 'No token, Authorization denied' });
    }
    //    Verify Token
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded.id;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: "Admin Token is not valid one." })
}

export { isAuth, isAdmin };