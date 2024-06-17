import { findUserByEmail, createUser } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

export async function registerUser(userData) {
  try {
    const existingUser = await findUserByEmail(userData.userName);
    if (existingUser) {
      throw new Error("User already exists");
    } else {
      await createUser(userData);
      return { user: userData.userName };
    }
  } catch (err) {
    throw new Error("Unable to register!");
  }
}

export async function loginUser(userData) {
  try {
    let data;
    const existingUser = await findUserByEmail(userData.userName);
    if (existingUser) {
      const storedHashedPassword = existingUser.password;
      bcrypt.compare(userData.password, storedHashedPassword, (err, result) => {
        if (err) {
          throw new Error("Unable to compare passwords");
        } else {
          console.log(result);
          if (result) {
            data = userData;
          } else {
            throw new Error("Incorrect Password");
          }
        }
      });
      return { message: "logged in", user: userData.userName };
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw new Error("Unable to Login!");
  }
}

export async function sendEmail(transporter, mailOptions) {
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error("Unable to send mail");
  }
}

export async function forgotPasswordMail(userData) {
  try {
    const existingUser = await findUserByEmail(userData.userName);
    if (existingUser) {
      const forgotPasswordOptions = {
        from: {
          name: "Rudhira",
          address: process.env.USER,
        },
        to: userData.userName,
        subject: "Reset your password",
        text: "Reset your password here",
        html: "<a href='https://www.youtube.com/'>Reset your password</a>",
      };
      await sendEmail(transporter, forgotPasswordOptions);
      return { user: userData, msg: "Mail Sent" };
    } else {
      throw new Error("User not found!");
    }
  } catch (err) {
    throw new Error("Cannot send mail");
  }
}
