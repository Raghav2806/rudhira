import { findUserByEmail, createUser } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export async function registerUser(userData) {
  try {
    const existingUser = await findUserByEmail(userData.userName);
    if (existingUser) {
      throw new Error("User already exists");
    } else {
      await createUser(userData);
      return userData;
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
      }) 
      return {message: "logged in",user: userData.userName};
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    throw new Error("Unable to Login!");
  }
}
