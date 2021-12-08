const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const authorization = require('./middleware/authorization')
const cors = require('cors');
const compression = require('compression')
require('dotenv').config();


const { sequelize } = require('./models');

const port = process.env.PORT || 3000;

const app = express();
const initializePassport = require("./passportConfig");

initializePassport(passport);

//Handlebars Middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

const hbs = exphbs.create({})

hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerHelper('ifEqualsTwo', function(arg1, arg2, arg3, arg4, options) {
  return (arg1 == arg2 && arg3 == arg4) ? options.fn(this) : options.inverse(this);
});

hbs.handlebars.registerHelper('ifEqualsThree', function(arg1, arg2, arg3, arg4, arg5, arg6, options) {
  return (arg1 == arg2 && arg3 == arg4 && arg5 == arg6) ? options.fn(this) : options.inverse(this);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(compression({
  level: 6
}))

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//Express Route
app.get('/login', authorization.checkAuthenticated,(req, res) => res.render('login', {error: req.flash('error')}));                                             
app.get('/register', authorization.checkAuthenticated, (req, res) => res.render('signup'));                                             
app.get('/reset', authorization.checkAuthenticated, (req, res) => res.render('reset'))                                             
app.get("/logout", (req, res) => {                                             
  req.logout();                                             
  res.redirect('/login')                                             
});  
app.get('/oobt', authorization.checkNotAuthenticated, (req, res) => {
   res.render('outOfBoundsTable', {layout: 'outOfBounds'})
 
  })

  app.get('/datacleaning', authorization.checkNotAuthenticated, (req, res) => {
    res.render('cleaning', {layout: 'datacleaning'})
  
   })
                                        
app.post(                                             
  "/login",                                             
  passport.authenticate("local", {                                             
    successRedirect: "/datacleaning",                                             
    failureRedirect: "/login",                                             
    failureFlash: true                                             
  })                                             
);                                             
                                             
app.use('/', require("./routes/prjt_metadata"));                                             
app.use('/', require('./routes/prjt_costs_hours'));                                             
app.use('/', require('./routes/prjt_savings'));                                             
app.use('/', require('./routes/prjt_fundings'));                                             
app.use('/', require('./routes/prjt_baseline'));                                             
app.use('/', require('./routes/getDataById'));                                             
app.use('/', require('./routes/prjt_misc_savings'));                                             
app.use('/', require('./routes/users'));         
app.use('/', require('./routes/athenaData'))    
app.use('/', require('./routes/meterAttributes'))                                
app.use('/', require('./routes/apiGateway'))                                
                                             
app.listen(port, async () => {                                             
  console.log(`Server started on port ${port}`);                                             
  await sequelize.sync();                                             
  console.log('Database connection established');                                             
});                                             
                                             
                                             
                                             