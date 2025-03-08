const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptJS = require("bcryptjs");
const salt = +process.env.SALT;
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const utlity = require("../utility");

/**
 * THis function is used to register new user
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.registration = async (req, res) => {
  try {
    const reqBody = req.body;
    const userDetails = await getUserDetails(reqBody.email);

    if (userDetails !== null) {
      return res.send(utlity.userExist());
    }

    await prisma.users.create({
      data: {
        name: reqBody.fullName,
        email: reqBody.email,
        phone: reqBody.phone,
        password: await generateHash(reqBody.password),
      },
    });

    return res.send({
      status: {
        code: 0,
        message: "User registration successful. Please login",
      },
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};

/**
 * This function is used to login user
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.login = async (req, res) => {
  try {
    const reqBody = req.body;
    const userDetails = await getUserDetails(reqBody.email);

    if (userDetails === null) {
      return res.send(utlity.userNotFound());
    }

    const isPasswordCorrect = await bcryptJS.compare(
      reqBody.password,
      userDetails.password
    );

    if (!isPasswordCorrect) {
      return res.send(utlity.incorrectPwd());
    }

    const details = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
    };
    const token = jwt.sign(details, jwtSecretKey, {
      expiresIn: "24h",
    });

    return res.send({
      status: {
        code: 0,
        message: "User logged in successful",
      },
      user: details,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};

/**
 * This function is used to get user details by email
 * @param {string} email
 * @returns
 */
const getUserDetails = async (email) => {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
};

/**
 * This function is used to convert plain text to hash using bcrypt library
 * @param {string} plainText
 * @returns
 */
const generateHash = async (plainText) => {
  return await bcryptJS.hash(plainText, salt);
};
