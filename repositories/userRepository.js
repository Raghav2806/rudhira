import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function findUserByEmail (email) {
    return await userModel.findOne({userName: email});
};

export async function createUser (userData) {
    bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
        if (err) {
          throw new Error("Unable to hash the password");
        } else {
          return await userModel.create({userName:userData.userName, password:hash});
        }
      });
};

export async function updatingPassword (userData) {
  bcrypt.hash(userData.password, saltRounds, async (err, hash) => {
    if (err) {
      throw new Error("Unable to hash the password");
    } else {
      return await userModel.findOneAndUpdate({userName:userData.userName},{password:hash});
    }
  });
};