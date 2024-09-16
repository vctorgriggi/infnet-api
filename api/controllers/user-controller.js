const UserService = require("../services/user-service");
const deleteFile = require("../utils/delete-file");

const userService = new UserService();

class UserController {
  static async create(req, res) {
    const { firstName, lastName, email } = req.body;

    try {
      await userService.create({
        firstName,
        lastName,
        email,
        imageUrl,
      });

      return res.status(201).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async get(req, res) {
    try {
      const users = await userService.get();

      return res.status(200).json(users);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await userService.getById(id);

      return res.status(200).json(user);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async updateById(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const currentUser = await userService.getById(id);

      const newUser = await userService.updateById({
        userId,
        id,
        firstName,
        lastName,
        email,
        imageUrl,
      });

      if (currentUser.imageUrl && imageUrl) {
        deleteFile(currentUser.imageUrl);
      }

      return res.status(200).json(newUser);
    } catch (error) {
      if (imageUrl) deleteFile(imageUrl);
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;

    try {
      const user = await userService.getById(id);

      await userService.deleteById(id);

      if (user.imageUrl) {
        deleteFile(user.imageUrl);
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }

  static async deleteImage(req, res) {
    const { id } = req.params;

    try {
      const currentUser = await userService.getById(id);

      const newUser = await userService.deleteImage(id);

      deleteFile(currentUser.imageUrl);

      return res.status(200).json(newUser);
    } catch (error) {
      console.error("Controller error:", error.message);
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = UserController;
