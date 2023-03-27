const { getAll, create, getOne, remove, update } = require('../controllers/productImg.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const upload = require('../utils/multer');

const productImgRouter = express.Router();

productImgRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create);

productImgRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(update);

module.exports = productImgRouter;