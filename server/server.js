const express = require('express');
import data from './data';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import user from './routes/user';

const app = express();
app.use(bodyParser.json());
// DB Connection

connectDB();

app.use("/api/users", user);
app.get("/", (req, res) => {
    res.send("Happy Code in Node");
})

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId)
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ msg: "Product Not Found." })
    }

});

app.listen(5000, () => { console.log("Server Running at http://localhost:5000") });