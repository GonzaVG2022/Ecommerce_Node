const express = require('express');
const categoryRouter = require('./category.router');
const productRouter = require('./product.routers');
const productImgRouter = require('./productImg.router');
const userRouter = require('./user.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/product_images',productImgRouter);


module.exports = router;