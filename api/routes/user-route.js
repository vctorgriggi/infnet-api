const { Router } = require("express");

const UserController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

const router = Router();

router
  .post("/", auth, upload.single("image"), UserController.create)
  .get("/", auth, UserController.get)
  .get("/:id", auth, UserController.getById)
  .put("/:id", auth, upload.single("image"), UserController.updateById)
  .delete("/:id", auth, UserController.deleteById)
  .delete("/i/:id", auth, UserController.deleteImage);

module.exports = router;
