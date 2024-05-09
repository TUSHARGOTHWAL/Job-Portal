const catchAsyncError = require("./catchAsyncError");
const { Errorhandler } = require("./middlewares/error");
const User = require("../models/userSchema");

const isAuth = catchAsyncError(async (req, res, next) => {
    const {token}= req.cookies;
    if(!token){
        return next(new Error(Errorhandler(401, "Login first to access this resource.")));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
});

module.exports = isAuth;