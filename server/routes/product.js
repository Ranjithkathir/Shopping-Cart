import express from 'express';
import Product from '../model/Product';
import { isAuth } from '../middleware/auth';

const router = express.Router();
const { check, validator, validationResult } = require('express-validator');

// @route POST api/products
// @desc Get All Products
// @access PRIVATE
router.get('/', isAuth, async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route POST api/products
// @desc Add Products
// @access PRIVATE

router.post('/', [isAuth,
    check('name', 'Name is required').not().isEmpty(),
    check('image', 'Product Image is required').not().isEmpty(),
    check('brand', 'Brand is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('countInStock', 'Stock Information is Necessary').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, price, image, brand, category, countInStock, description, rating, numReviews } = req.body;

    // Build Products object
    const productFields = {};
    if (name) productFields.name = name;
    if (price) productFields.price = price;
    if (image) productFields.image = image;
    if (brand) productFields.brand = brand;
    if (category) productFields.category = category;
    if (countInStock) productFields.countInStock = countInStock;
    if (description) productFields.description = description;
    if (rating) productFields.rating = rating;
    if (numReviews) productFields.numReviews = numReviews;

    try {
        const productId = req.params.id;
        // Create Product
        let product = new Product(productFields);
        await product.save();
        if (product) {
            return res.json(product);
        } else {
            res.status(500).send('Currently Unable to add products');
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }

});

// @route GET api/products/:id
// @desc GET PRODUCT DETAIL
// @access PRIVATE

router.get('/:id', [isAuth], async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ msg: "Product Not Found." })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/products/:id
// @desc Updating Products
// @access PRIVATE

router.put('/:id', [isAuth,
    check('name', 'Name is required').not().isEmpty(),
    check('image', 'Product Image is required').not().isEmpty(),
    check('brand', 'Brand is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('countInStock', 'Stock Information is Necessary').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, price, image, brand, category, countInStock, description, rating, numReviews } = req.body;

    // Build Products object
    const productFields = {};
    if (name) productFields.name = name;
    if (price) productFields.price = price;
    if (image) productFields.image = image;
    if (brand) productFields.brand = brand;
    if (category) productFields.category = category;
    if (countInStock) productFields.countInStock = countInStock;
    if (description) productFields.description = description;
    if (rating) productFields.rating = rating;
    if (numReviews) productFields.numReviews = numReviews;

    try {
        const productId = req.params.id;
        console.log(productId)
        if (productId) {
            let product = await Product.findOne({ _id: productId });
            if (product) {
                // Update Product
                product = await Product.findOneAndUpdate({ _id: productId }, { $set: productFields }, { new: true });

                return res.json(product);
            } else {
                return res.status(401).send({
                    msg: 'No product found in the given Id To Update'
                });
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }

});

// @route DELETE api/products/:id
// @desc GET PRODUCT DETAIL
// @access PRIVATE

router.delete('/:id', [isAuth], async (req, res) => {
    const productId = req.params.id;
    try {
        await Product.findOneAndRemove({ _id: productId });

        res.json({ msg: "Product Deleted Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

export default router;