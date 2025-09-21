const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const slugify = require('slugify');
const fs = require('fs');
const path = require('path'); 
const ApiError = require('../utils/apiError');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const factory = require('./handlersFactory');
const Product = require('../models/productModel');

exports.uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    req.body.imageCover = imageCoverFileName;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        req.body.images.push(imageName);
      })
    );
  }
  next();
});


exports.getProducts = factory.getAll(Product, 'Products');
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name')
    .populate('subcategories', 'name')
    .populate('brand', 'name')
    .populate('user', 'name email');

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

 
  const fixedProduct = product.toObject();
  
  if (fixedProduct.imageCover && fixedProduct.imageCover.includes('undefined/')) {
    fixedProduct.imageCover = fixedProduct.imageCover.replace('undefined/', 'http://localhost:8000/uploads/');
  }
  
  if (fixedProduct.images) {
    fixedProduct.images = fixedProduct.images.map(img => 
      img.includes('undefined/') ? img.replace('undefined/', 'http://localhost:8000/uploads/') : img
    );
  }

  res.status(200).json({
    status: 'success',
    data: { product: fixedProduct }
  });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category user');
  

  const fixedProducts = products.map(product => {
    const fixedProduct = product.toObject();
    
    if (fixedProduct.imageCover && fixedProduct.imageCover.includes('undefined/')) {
      fixedProduct.imageCover = fixedProduct.imageCover.replace('undefined/', 'http://localhost:8000/uploads/');
    }
    
    if (fixedProduct.images) {
      fixedProduct.images = fixedProduct.images.map(img => 
        img.includes('undefined/') ? img.replace('undefined/', 'http://localhost:8000/uploads/') : img
      );
    }
    
    return fixedProduct;
  });
  
  res.status(200).json({
    status: 'success',
    results: fixedProducts.length,
    data: { products: fixedProducts }
  });
});



exports.getMyProducts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page,10) || 1;
  const limit = parseInt(req.query.limit,10) || 10;
  const skip = (page - 1) * limit;
  
  const products = await Product.find({ user: req.user.id })
    .skip(skip)
    .limit(limit)
    .populate('category', 'name')
    .populate('subcategories', 'name')
    .populate('brand', 'name')
    .populate('user', 'name email');
  
  const total = await Product.countDocuments({ user: req.user.id });
  
 
  const fixedProducts = products.map(product => {
    const fixedProduct = product.toObject();
    
    if (fixedProduct.imageCover && fixedProduct.imageCover.includes('undefined/')) {
      fixedProduct.imageCover = fixedProduct.imageCover.replace('undefined/', 'http://localhost:8000/uploads/');
    }
    
    if (fixedProduct.images) {
      fixedProduct.images = fixedProduct.images.map(img => 
        img.includes('undefined/') ? img.replace('undefined/', 'http://localhost:8000/uploads/') : img
      );
    }
    
    return fixedProduct;
  });
  
  res.status(200).json({
    status: 'success',
    results: fixedProducts.length,
    data: {
      products: fixedProducts, 
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

exports.updateMyProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!product) {
      return next(new ApiError('Product not found or you are not authorized to update it', 404));
    }

  
    const textFields = ['title', 'description', 'price', 'quantity', 'forRent', 'category', 'brand', 'priceAfterDiscount'];
    textFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });


    if (req.body.title && req.body.title !== product.title) {
      product.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
        locale: 'ar'
      });
    }


    if (req.body.colors !== undefined) {
      try {
        product.colors = JSON.parse(req.body.colors);
      } catch (error) {
        product.colors = req.body.colors;
      }
    }


    if (req.body.subcategories !== undefined) {
      try {
        product.subcategories = JSON.parse(req.body.subcategories);
      } catch (error) {
        product.subcategories = req.body.subcategories;
      }
    }

   
    if (req.files) {
  
      if (req.files.imageCover && req.files.imageCover[0]) {

        if (product.imageCover) {
          const oldCoverPath = path.join(__dirname, '..', 'uploads', 'products', product.imageCover);
          if (fs.existsSync(oldCoverPath)) {
            fs.unlinkSync(oldCoverPath);
          }
        }


        const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
        await sharp(req.files.imageCover[0].buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(path.join(__dirname, '..', 'uploads', 'products', imageCoverFileName));
        
        product.imageCover = imageCoverFileName;
      }

    
      if (req.files.images && req.files.images.length > 0) {

        if (product.images && product.images.length > 0) {
          product.images.forEach(oldImage => {
            const oldImagePath = path.join(__dirname, '..', 'uploads', 'products', oldImage);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          });
        }

   
        const newImages = [];
        await Promise.all(
          req.files.images.map(async (img, index) => {
            const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
            await sharp(img.buffer)
              .resize(2000, 1333)
              .toFormat('jpeg')
              .jpeg({ quality: 95 })
              .toFile(path.join(__dirname, '..', 'uploads', 'products', imageName));
            newImages.push(imageName);
          })
        );
        
        product.images = newImages;
      }
    }

    const updatedProduct = await product.save();
    
    res.status(200).json({
      status: 'success',
      data: updatedProduct
    });

  } catch (error) {
    console.error('Update error:', error);
    return next(new ApiError('Error updating product: ' , 500));
  }
});


exports.deleteMyProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  
  if (!product) {
    return next(new ApiError('Product not found or you are not authorized to delete it', 404));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});