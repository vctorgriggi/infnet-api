const { v4: uuidv4 } = require("uuid");
const { hash } = require("bcryptjs");
const { Op } = require("sequelize");
const crypto = require("crypto");

const MailService = require("./mail-service");
const database = require("../models");

const mailService = new MailService();

class UserService {
  async create(dto) {
    const byEmail = await database.Users.findOne({
      where: {
        email: { [Op.iLike]: dto.email },
      },
    });

    if (byEmail) {
      throw new Error("There is already a user with this email.");
    }

    try {
      const password = crypto.randomBytes(8).toString("hex");
      const hashedPassword = await hash(password, 10);

      const newUser = await database.Users.create({
        id: uuidv4(),
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash: hashedPassword,
      });

      try {
        const subject = "Welcome to our platform!";
        const text = `Hello, ${newUser.firstName}! Your account has been created successfully. Before you can sign in, you need to set a password. Please click on 'Forgot Password' on the login page and follow the steps to create a new password.`;

        await mailService.sendMail(newUser.email, subject, text);
      } catch (error) {
        console.warn(
          "There was a problem sending the email. Please try again later."
        );
      }
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async get() {
    const users = await database.Users.findAll();

    return users;
  }

  async getById(id) {
    const user = await database.Users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  async updateById(dto) {
    const user = await database.Users.findOne({
      where: {
        id: dto.id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const byEmail = await database.Users.findOne({
      where: {
        email: { [Op.iLike]: dto.email },
        id: { [Op.ne]: dto.id },
      },
    });

    if (byEmail) {
      throw new Error("There is already a user with this email.");
    }

    try {
      if (dto.userId !== user.id) {
        throw new Error("You are not authorized to update this user.");
      }

      user.firstName = dto.firstName;
      user.lastName = dto.lastName;
      user.email = dto.email;
      if (dto.imageUrl) user.imageUrl = dto.imageUrl; // update image only if a new one is provided

      await user.save();

      return await user.reload();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteById(id) {
    const user = await database.Users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    try {
      await database.Users.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }

  async deleteImage(id) {
    const user = await database.Users.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.imageUrl) {
      throw new Error("Image not found.");
    }

    try {
      user.imageUrl = null;

      await user.save();
    } catch (error) {
      console.error("Service error:", error.message);
      throw error;
    }
  }
}

module.exports = UserService;
