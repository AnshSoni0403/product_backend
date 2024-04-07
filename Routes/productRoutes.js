const express = require('express');

const router = express.Router()

const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
} = require('../Controllers/productControllers')

router.get('/products', getAllProducts)

router.get('/products/:id', getProduct)

router.post('/products', addProduct)

router.patch('/product/:id', updateProduct)

router.delete('/product/:id', deleteProduct)

module.exports = router

