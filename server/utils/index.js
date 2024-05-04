import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (userValue) => {
  // console.log("userValue : " + userValue)
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userValue, salt);

    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Error hashing string");
  }
};

export const compareString = async (userPassword, password) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, password);
    // console.log(userPassword + password )
    return isMatch;
  } catch (error) {
    console.error(error);
    throw new Error("Error comparing strings");
  }
};

//JSON WEB TOKEN
export function createJWT(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}