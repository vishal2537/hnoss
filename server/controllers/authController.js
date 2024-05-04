import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";

export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      provider,
      image,
      age,
      gender,
      city,
      state,
      profession,
    } = req.body;
    if (
      !(
        firstName ||
        lastName ||
        email ||
        password ||
        age ||
        gender ||
        city ||
        state ||
        profession
      )
    ) {
      return next("Provide Required Fields!");
    }

    const userExist = await Users.findOne({ email });

    if (userExist) {
      return next("Email Address already exists. Try Login");
    }

    const hashedPassword = await hashString(password);
    console.log("....pass : "+hashedPassword)

    const user = await Users.create({
      name: firstName + " " + lastName,
      email,
      password: provider ? hashedPassword : hashedPassword,
      // password: provider ? hashedPassword : "",
      // password: provider ? hashedPassword : password,
      image,
      provider,
      city,
      state,
      age,
      gender,
      profession,
    });

    user.password = undefined;

    const token = createJWT(user?._id);
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const googleSignUp = async (req, res, next) => {
  try {
    const { name, email, image } = req.body;

    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists. Try Login");
      return;
    }

    const user = await Users.create({
      name,
      email,
      image,
      provider: "Google",
    });

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(password);

    //validation
    if (!email) {
      return next("Please Provide User Credentials");
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return next("Invalid email or password");
    }

    // Google account signed in
    if (!password && user?.provider === "Google") {
      const token = createJWT(user?._id);

      return res.status(201).json({
        success: true,
        message: "Login successfully",
        user,
        token,
        
      });
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      return next("Invalid email or password");
    }

    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: "failed", message: error.message });
  }
};
