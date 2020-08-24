import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveProduct } from '../../actions/productManage';
import { deleteProduct } from '../../actions/productManage';
import Loader from '../layouts/Loader';
import Alert from '../layouts/Alert';
import { listProducts } from '../../actions/productList';

const ProductManage = ({ saveProduct, listProducts, deleteProduct, isAuthenticated }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        brand: '',
        category: '',
        countInStock: '',
        description: ''
    })

    const { name, price, image, brand, category, countInStock, description } = formData;

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        saveProduct({ _id: id, name, price, image, brand, category, countInStock, description });
    }

    const deleteHandler = (product) => {
        deleteProduct(product._id);
    }

    const openModel = (product) => {
        setModalVisible(true)

        if ((product !== null)) {
            setId(product._id);
            setFormData({ ...product, formData });
        }
    }

    const productSave = useSelector(state => state.productManage);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productManage);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        listProducts();
        return () => {
            //
        }
    }, [successSave, successDelete])

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={() => openModel({})}>Create Product</button>
            </div>

            {modalVisible &&
                <div className="form">
                    <form onSubmit={(e) => submitHandler(e)} >
                        <ul className="form-container">
                            <Alert />
                            <li><h2>Create A Product</h2></li>
                            {/* {loadingSave && <Loader />} */}
                            {errorSave && <div>{errorSave}</div>}
                            <li>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => onChange(e)} required />
                            </li>
                            <li>
                                <label htmlFor="price">
                                    Price
                                </label>
                                <input type="text" name="price" id="price" value={price} onChange={(e) => onChange(e)} required />
                            </li>
                            <li>
                                <label htmlFor="image">
                                    Product Image
                                </label>
                                <input type="text" name="image" id="image" value={image} onChange={(e) => onChange(e)} required />
                            </li>
                            <li>
                                <label htmlFor="brand">
                                    Brand
                                </label>
                                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => onChange(e)} required />
                            </li>
                            <li>
                                <label htmlFor="category">
                                    category
                                </label>
                                <input type="text" name="category" id="category" value={category} onChange={(e) => onChange(e)} required />
                            </li>
                            <li>
                                <label htmlFor="countInStock">
                                    Stock Count
                                </label>
                                <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => onChange(e)} required />
                            </li>
                            <li>
                                <label htmlFor="description">
                                    Description
                                </label>
                                <textarea name="description" id="description" value={description} onChange={(e) => onChange(e)}></textarea>
                            </li>
                            <li>
                                <button type="submit" className="button primary">{id ? "Update a Product" : "Create A Product"}</button>
                            </li>
                            <li>
                                <button type="submit" className="button secondary" onClick={() => setModalVisible(false)}> Back </button>
                            </li>
                        </ul>
                    </form>
                </div>
            }


            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button className="button" onClick={() => openModel(product)}>Edit</button>
                                        {' '}
                                        <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

ProductManage.propTypes = {
    listProducts: PropTypes.func.isRequired,
    saveProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    product: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    products: state.productList,
    product: state.productManage,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { saveProduct, listProducts, deleteProduct })(ProductManage);