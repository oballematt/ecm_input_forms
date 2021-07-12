// const { Users } = require('../models');
// require('dotenv').config();
// const jwtGenerator = require('../utils/jwtGenerator');
// const bcrypt = require('bcrypt')

// module.exports = {
//     createUser: async (req, res) => {

//         const { email, password } = req.body;

//         let errors = [];

//         const userArray = [process.env.USER1, process.env.USER2, process.env.USER3, process.env.USER4, process.env.USER5, process.env.USER6, process.env.USER7, process.env.USER8, process.env.USER9, process.env.USER10, process.env.USER11];

//         try {

//             const isValid = userArray.includes(email)

//             const users = await Users.findAll({
//                 where: {
//                     email
//                 }
//             });

//             if (users.length !== 0) {

//                 errors.push({ text: "Email already exists" });

//                 return res.status(401).send('Email already exists');
//             };

//             if (!isValid) {

//                 errors.push({ text: "Invalid Email"});

//                 return res.status(401).json("Invalid Email");
//             };

//             const newUser = await Users.create({ email, password });

//             const token = jwtGenerator(newUser.id);

//             console.log({token})

//             return res.json({token})

//         } catch (error) {

//             console.error(error.message);
//             return res.status(500).json(error);

//         };
//     },

//     loginUser: async (req, res) => {
//         const { email, password } = req.body;

//         try {

//             const user = await Users.findOne({
//                 where: {
//                     email
//                 }
//             });

//             if (!user) {
//                 return res.status(401).json("Email or Password is incorrect");
//             };

//             const validPassword = await bcrypt.compare(password, user.password);

//             if (!validPassword) {
//                 return res.status(401).json("Email or Password is incorrect");
//             };

//             const token = jwtGenerator(user.id);

//             res.json({ token });

//         } catch (error) {

//             console.error(error.message);
//             res.status(500).send("Server Error");
//         };
//     },

//     verifyUser: async (req, res) => {
//         try {
           
//             res.json(true)

//         } catch (error) {

//             console.error(error.message
//                 )
//             res.status(500).send("Server Error")
//         };
//     },

// }