const multer = require('multer');
const ApiError = require('../utils/apiError');

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};


const uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

const uploadMixOfImages = (arrayOfFields) => multerOptions().fields(arrayOfFields);

const parseFormDataTextFields = (req, res, next) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    const fieldsToParse = ['colors', 'subcategories', 'data'];
    
    fieldsToParse.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (error) {
          console.log(`Could not parse field ${field}:`, error.message);
        }
      }
    });
    
    if (req.body.data && typeof req.body.data === 'object') {
      req.body = { ...req.body, ...req.body.data };
      delete req.body.data;
    }
  }
  next();
};


module.exports = {
  uploadSingleImage,
  uploadMixOfImages,
  parseFormDataTextFields
};

