const express = require('express');

const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
  getMyProducts, 
  updateMyProduct,
  deleteMyProduct
} = require('../services/productService'); 
const authService = require('../services/authService');
const checkActiveUser = require('../middlewares/activeUserMiddleware'); 

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(
    authService.protect,
    checkActiveUser,
    authService.allowedTo('admin', 'manager', 'user'),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    checkActiveUser, 
    authService.allowedTo('admin', 'manager'),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    checkActiveUser, 
    authService.allowedTo('admin', 'manager'),
    deleteProductValidator,
    deleteProduct
  );


router.get(
  '/user/my-products',
  authService.protect,
  checkActiveUser,
  getMyProducts
);
const { parseFormDataTextFields } = require('../middlewares/uploadImageMiddleware');

router.put(
  '/user/my-products/:id',
  authService.protect,
  checkActiveUser,
  uploadProductImages,        
  parseFormDataTextFields,   
  resizeProductImages,       
  updateMyProduct            
);

router.delete(
  '/user/my-products/:id',
  authService.protect,
  checkActiveUser,
  deleteMyProduct
);

module.exports = router;