const somethingWentWrong = () => {
  return {
    status: {
      code: -1,
      message: "Something went wrong ! Try again",
    },
  };
};

const tokenExpired = () => {
  return {
    status: {
      code: -1,
      message: "Token Expired ! Please login again",
    },
  };
};

const notAuthorized = () => {
  return {
    status: {
      code: 0,
      message: "You are not authorized",
    },
  };
};
const userExist = () => {
  return {
    status: {
      code: -1,
      message: "User already exists !",
    },
  };
};

const userNotFound = () => {
  return {
    status: {
      code: -1,
      message: "User details not found !",
    },
  };
};

const incorrectPwd = () => {
  return {
    status: {
      code: -1,
      message: "Incorrect Password !",
    },
  };
};

module.exports = {
  somethingWentWrong,
  incorrectPwd,
  userExist,
  userNotFound,
  tokenExpired,
  notAuthorized,
};
