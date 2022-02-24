const { Users } = require("../models");
require("dotenv").config();

module.exports = {
  createUser: async (req, res) => {
    const { email, password, password2, name, role } = req.body;

    let errors = [];

    

    try {
     
      const users = await Users.findAll({
        where: {
          email,
        },
      });

      if (users.length !== 0) {
        errors.push({ text: "Email already exists" });
      }

      
      if (!email) {
        errors.push({ text: "Please enter an email" });
      }

      if (!password) {
        errors.push({ text: "Please enter a password" });
      }

      if (password.length < 6) {
        errors.push({ text: "Password must be at least 6 characters" });
      }

      if (password !== password2) {
        errors.push({ text: "Passwords do not match" });
      }

      if (!name) {
        errors.push({ text: "Please enter your first and last name" });
      }

      if (errors.length > 0) {
        return res.json(errors);
      } else {
        const users = await Users.create({
          email,
          password,
          name,
          role: "Public",
        });

        return res.json(users);
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json(error);
    }
  },

  resetPassword: async (req, res) => {
    const { password, password2, email } = req.body;

    let errors = [];

    let success = [];
    try {
      const user = await Users.findAll({
        where: {
          email,
        },
      });

      if (!email || user.length === 0) {
        errors.push({ text: "Please enter a valid email" });
      }

      if (!password) {
        errors.push({ text: "Please enter a password" });
      }

      if (password.length < 6) {
        errors.push({ text: "Password must be at least 6 characters" });
      }

      if (password !== password2) {
        errors.push({ text: "Passwords do not match" });
      }

      if (errors.length > 0) {
        return res.render("reset", {
          errors,
          email,
        });
      } else {
        await Users.update(
          {
            password,
          },
          {
            where: {
              email,
            },
          }
        )
          .then(() => {
            success.push({ text: "Password updated!" });
          })
          .catch((error) => {
            console.error(error);
          });

        return res.render("reset", {
          success,
        });
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).json(error);
    }
  },
};
