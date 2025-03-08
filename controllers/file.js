const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const utlity = require("../utility");

/**
 * This function is used to handle file uplaod wrt user
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.uplaodFile = async (req, res) => {
  try {
    const file = req.file;
    await prisma.files.create({
      data: {
        name: file.filename,
        uploaded_at: new Date(),
        users: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.send({
      status: {
        code: 0,
        message: "Image uploaded successfully !",
      },
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};

/**
 * This function is used to get all uploaded files wrt user
 * @param {object} req
 * @param {object} res
 * @returns
 */
exports.allFiles = async (req, res) => {
  try {
    const data = await prisma.files.findMany({
      orderBy: {
        uploaded_at: "desc",
      },
      where: {
        user_id: req.user.id,
      },
    });

    data.forEach((file) => {
      file.url = `${process.env.BASE_PATH}/uploads/${file.name}`;
    });

    return res.send({
      status: {
        code: 0,
        message: "All files fetched successfully",
      },
      files: data,
    });
  } catch (error) {
    console.log(error);
    return res.send(utlity.somethingWentWrong());
  }
};
