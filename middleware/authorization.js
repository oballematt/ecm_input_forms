// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// module.exports = function(req, res, next) {

//   const token = req.headers["token"];


//   if (!token) {
//     return res.status(403).json({ msg: "authorization denied" });
//   }

//   try {
//     const verify = jwt.verify(token, process.env.JWTSECRET);

//     req.user = verify.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/");
    }
    next();
  }
  
const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  exports.checkAuthenticated = checkAuthenticated;
  exports.checkNotAuthenticated = checkNotAuthenticated;