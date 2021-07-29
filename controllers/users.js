const { Users } = require('../models');
require('dotenv').config();

module.exports = {
    createUser: async (req, res) => {

        const { email, password, password2 } = req.body;

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

            };

            if (!isValid) {

                errors.push({ text: "Invalid Email" });

            };

            if (!email) {
                errors.push({ text: "Please enter an email" })
            };

            if (!password) {
                errors.push({ text: "Please enter a password" })
            };

            if (password.length < 6) {
                errors.push({ text: "Password must be at least 6 characters" })
            }

            if (password !== password2) {
                errors.push({ text: "Passwords do not match" })
            }


            if (errors.length > 0) {
                return res.render('signup', { errors })

            } else {

                const newUser = await Users.create({ email, password });

                return res.redirect('/login')
            }

        } catch (error) {

            console.error(error.message);
            return res.status(500).json(error);

        };
    },

    resetPassword: async (req, res) => {
        const { password, password2, email } = req.body;

        let errors = []

        let success = []
        try {

            const user = await Users.findAll({
                where: {
                    email
                }
            })

            if (!user) {
                errors.push({ text: "Please enter a valid email" })
            }

            if (user.length === 0) {
                errors.push({ text: "Email does not exist" })
            }

            if (!password) {
                errors.push({ text: "Please enter a password" })
            };

            if (password.length < 6) {
                errors.push({ text: "Password must be at least 6 characters" })
            }

            if (password !== password2) {
                errors.push({ text: "Passwords do not match" })
            }

            if (errors.length > 0) {
                return res.render('reset', {
                    errors,
                    email
                })

            } else {

                await Users.update({
                    password
                },
                    {
                        where: {
                            email
                        }
                    }).then(() => {
                        success.push({ text: 'Password updated!' })
                    }).catch(error => {
                        console.error(error)
                    })

                return res.render('reset', {
                    success
                })
            }
        } catch (error) {
            console.error(error.message);
            return res.status(500).json(error);
        }
    }
}
