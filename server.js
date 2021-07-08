const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config()

const { sequelize } = require('./models');

const port = process.env.PORT || 3000;

const app = express();

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

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

//Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express Route
app.use('/', require("./routes/prjt_metadata"));
app.use('/', require('./routes/prjt_costs_hours'));
app.use('/', require('./routes/prjt_savings'));
app.use('/', require('./routes/prjt_fundings'));
app.use('/', require('./routes/prjt_baseline'));
app.use('/', require('./routes/getDataById'));
app.use('/', require('./routes/prjt_misc_savings'));
app.use('/', require('./routes/users'));

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  await sequelize.sync();
  console.log('Database connection established');
});


