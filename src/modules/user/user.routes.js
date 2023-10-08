const { Router } = require("express");
const { User, Participant } = require("../../models");
const {
  registerUser,
  loginUser,
  // validateUserEmail,
  getAllUsers,
  uploadAvatar, // se importa
} = require("./user.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { registerUserValidator, loginValidatior } = require("./user.validator");
const upload = require("../../middlewares/imageUpload.middleware");
const router = Router();

router
  .route("/") // api/vs/users
  .get(authenticate, getAllUsers) // hacemos la peticion de tipo get y pedimos autenticacion que es el token del usuario logiado
  .post(registerUserValidator, registerUser)
  .get(async (req, res, next) => {
    try {
      const result = await User.findAll({
        include: {
          model: Participant,
        },
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

router.put("/:id", upload.single("avatar"), uploadAvatar);

router.post("/login", loginValidatior, loginUser);

// router.post("/validate", validateUserEmail); // peticion

module.exports = router;
