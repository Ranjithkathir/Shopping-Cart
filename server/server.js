const express = require('express');
import data from './data';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import user from './routes/user';
import product from './routes/product';

const app = express();
app.use(bodyParser.json());
// DB Connection

connectDB();

app.use("/api/users", user);
app.use("/api/products", product);
app.get("/", (req, res) => {
    res.send("Happy Code in Node");
})

// app.get("/api/products", isAuth, (req, res) => {
//     res.send(data.products);
// });

// app.get("/api/products/:id", isAuth, (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId)
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({ msg: "Product Not Found." })
//     }

// });

app.listen(5000, () => { console.log("Server Running at http://localhost:5000") });