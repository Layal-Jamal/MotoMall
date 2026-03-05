const ApiError = require('../utils/apiError');

const checkActiveUser = (req, res, next) => {
  if (!req.user.active) {
    return next(new ApiError('Your account is not active. Please log in again to continue', 401));
  }
  next();
};

module.exports = checkActiveUser;