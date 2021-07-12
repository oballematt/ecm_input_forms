const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bcrypt = require('bcrypt')
const passport = require("passport");
const flash = require("express-flash");
const pool = require('./config/dbConfig')
const session = require("express-session");
const authorization = require('./middleware/authorization')
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

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Express Route
app.get('/login', authorization.checkAuthenticated,(req, res) => res.render('login'));
app.get('/register', authorization.checkAuthenticated, (req, res) => res.render('signup'));
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/login')
});
app.use('/', require("./routes/prjt_metadata"));
app.use('/', require('./routes/prjt_costs_hours'));
app.use('/', require('./routes/prjt_savings'));
app.use('/', require('./routes/prjt_fundings'));
app.use('/', require('./routes/prjt_baseline'));
app.use('/', require('./routes/getDataById'));
app.use('/', require('./routes/prjt_misc_savings'));
// app.use('/', require('./routes/users'));

const userArray = [process.env.USER1, process.env.USER2, process.env.USER3, process.env.USER4, process.env.USER5, process.env.USER6, process.env.USER7, process.env.USER8, process.env.USER9, process.env.USER10, process.env.USER11];

app.post("/register", async (req, res) => {
  let { email, password, password2 } = req.body;
  let errors = []
  const isValid = userArray.includes(email)

  try {

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    if (user.rows.length > 0) {
      errors.push({ text: "Email already exists" })
    }

    if (!email) {
      errors.push({ text: "Please enter an email" })
    };

    if (!password) {
      errors.push({ text: "Please enter a password" })
    };
  
    if (password.length < 6){
      errors.push({text: "Password must be atleast than 6 characters"})
    }

    if (password !== password2){
      errors.push({text: "Passwords do not match"})
    }

    if (!isValid) {

      errors.push({ text: "Invalid Email" });

    };

    if (errors.length > 0) {
      res.render('signup', { errors, email, password })
    } else {
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const newUser = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, bcryptPassword]
      )
      res.redirect('/login')
    }
  } catch (error) {
    console.error(error.message);

  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await sequelize.sync();
  console.log('Database connection established');
});


