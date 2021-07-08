const { Users } = require('../models');
require('dotenv').config();

module.exports = {
    createUser: async (req, res) => {

        const { email, password } = req.body;

        let errors = [];

        const userArray = [process.env.USER1, process.env.USER2, process.env.USER3, process.env.USER4, process.env.USER5, process.env.USER6, process.env.USER7, process.env.USER8, process.env.USER9, process.env.USER10, process.env.USER11];

        try {

            const isValid = userArray.includes(email)

            const users = await Users.findAll({
                where: {
                    email
                }
            });

            if (users.length !== 0) {

                errors.push({ text: "Email already exists" });

                return res.status(401).send('Email already exists');
            };

            if (!isValid) {

                errors.push({ text: "Invalid Email"});

                return res.status(401).json("Invalid Email");
            };

            const newUser = await Users.create({ email, password });

            res.json(newUser);


        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    }
}