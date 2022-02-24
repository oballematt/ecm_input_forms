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
  
  const checkIfAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
      res.status(403) 
      return res.send('Not Authorized') 
    }
    next()
  }
                                                                 
  exports.checkAuthenticated = checkAuthenticated;                                                                 
  exports.checkNotAuthenticated = checkNotAuthenticated;      
  exports.checkIfAdmin = checkIfAdmin                                                           