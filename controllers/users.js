const { Users } = require("../models");
const { ResetToken } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const validator = require("validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const aws = require("@aws-sdk/client-ses");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
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

      if (!validator.isEmail(email)) {
        errors.push({ text: "Please enter a valid email" });
      }
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

  forgotPassword: async (req, res) => {
    const email = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email === null) {
      return res.json({ status: "ok" });
    }

    await ResetToken.update(
      {
        used: 1,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );

    const fpSalt = crypto.randomBytes(64).toString("base64");

    const expireDate = new Date(new Date().getTime() + 60 * 60 * 1000);

    await ResetToken.create({
      email: req.body.email,
      expiration: expireDate,
      token: fpSalt,
      used: 0,
    });

    const ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: "us-east-1",
      defaultProvider,
    });

    // create Nodemailer SES transporter
    let transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });

    transporter.sendMail(
      {
        from: process.env.SENDER,
        to: req.body.email,
        subject: "Forgot Password",
        text:
          "To reset your password, please click the link below.\n\nhttps://" +
          process.env.DOMAIN +
          "/user/reset-password?token=" +
          encodeURIComponent(fpSalt) +
          "&email=" +
          req.body.email,
        ses: {
          // optional extra arguments for SendRawEmail
          Tags: [
            {
              Name: "tag_name",
              Value: "tag_value",
            },
          ],
        },
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      }
    );
    return res.json({ status: "ok" });
  },

  getResetForm: async (req, res) => {
    await ResetToken.destroy({
      where: {
        expiration: { [Op.lt]: Sequelize.fn("NOW") },
      },
    });

    const record = await ResetToken.findOne({
      where: {
        email: req.query.email,
        expiration: { [Op.gt]: Sequelize.fn("NOW") },
        token: req.query.token,
        used: 0,
      },
    });

    if (record == null) {
      return res.render("userInfo/resetPassword", {
        layout: 'loginLayout',
        message: "Token has expired. Please try password reset again.",
        showForm: false,
      });
    }

    res.render("userInfo/resetPassword", {
      layout: 'loginLayout',
      showForm: true,
      record: record,
    });
  },

  resetPassword: async (req, res) => {
    try {
      if (req.body.password1 !== req.body.password2) {
        return res.json({
          status: "error",
          message: "Passwords do not match. Please try again.",
        });
      }
  
      const record = await ResetToken.findOne({
        where: {
          email: req.body.email,
          expiration: { [Op.gt]: Sequelize.fn("NOW") },
          token: req.body.token,
          used: 0,
        },
      });
  
      if (record == null) {
        return res.json({
          status: "error",
          message:
            "Token not found. Please try the reset password process again.",
        });
      }
  
      await ResetToken.update(
        {
          used: 1,
        },
        {
          where: {
            email: req.body.email,
          },
        }
      );
      await Users.update(
        {
          password: req.body.password1,
        },
        {
          where: {
            email:req.body.email,
          },
        }
      );
  
      return res.json({
        status: "ok",
        message: "Password reset. Please login with your new password.",
      });
    } catch (error) {
      console.log(error)
      return res.json(error)
    }
    
  },
};
