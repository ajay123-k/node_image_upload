const utility = require("../utility");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.send(utility.notAuthorized());
    }

    jwt.verify(token, jwtSecretKey, (err, data) => {
      if (err) {
        return res.send(utility.somethingWentWrong());
      }
      req.user = data;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.send(utility.somethingWentWrong());
  }
};

module.exports = isAuth;
