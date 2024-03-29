import jwt, { decode } from 'jsonwebtoken';
const dotenv = require('dotenv');
import config from './config/default';

dotenv.config();

const getToken = (user) => {
    return jwt.sign({
        id: user.id
    }, config.JWT_SECRET, {
        expiresIn: '6h'
    });
};

// const isAuth = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (token) {
//         const onlyToken = token.slice(7, token.length);
//         jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(401).send({ msg: 'Invalid Token.' });
//             }
//             req.user = token;
//             next();
//             return
//         });
//     }
//     return res.status(401).send({ msg: "Token is not provided." })
// }

// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         return next();
//     }
//     return res.status(401).send({ msg: "Admin Token is not valid one." })
// }

export { getToken };