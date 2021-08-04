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