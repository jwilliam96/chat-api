const { check } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const registerUserValidator = [
  check("firstname", "Error con firstname")
    .exists()
    .withMessage("no se incluye la propiedad firstmane")

    .notEmpty()
    .withMessage("El firstname no debe de estar vacio")

    .isString()
    .withMessage("El valor del firstname debe de ser string")

    .isLength({ min: 2, max: 50 })
    .withMessage("la longitud del nombre debe ser entre 2 y 50 caracteres")

    .matches(/^[a-zA-Z\s]/)
    .withMessage("El firstname solo se aceptan letras"),

  check("lastname", "Error con lastname")
    .exists()
    .withMessage("no se incluye la propiedad lastmane")

    .notEmpty()
    .withMessage("El lastname no debe de estar vacio")

    .isString()
    .withMessage("El valor del lastname debe de ser string")

    .isLength({ min: 2, max: 50 })
    .withMessage("la longitud del lastname debe ser entre 2 y 50 caracteres")

    .matches(/^[a-zA-Z\s]/)
    .withMessage("El lastname solo se aceptan letras"),

  check("email", "error con el campo email")
    .exists()
    .withMessage("no se incluye la propiedad email")

    .notEmpty()
    .withMessage("el email no debe de estar vacio")

    .isString()
    .withMessage("la propiedad email debe ser un string")

    .isEmail()
    .withMessage("la propiedad email no tiene el formato de correo")

    .isLength({ min: 7, max: 50 })
    .withMessage("El email debe ser minimo entre 7 y maximo 50 caracteres"),

  check("password", "error con el campo password")
    .exists()
    .withMessage("la propiedad password no esta incluida")

    .notEmpty()
    .withMessage("el password no debe de estar vacio")

    .isString()
    .withMessage("el password debe de ser un string")

    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
    )
    .withMessage(
      "el password debe ser minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial "
    ),
  validateResult,
];

const loginValidatior = [
  check("email", "Error con la propiedad email")
    .exists()
    .withMessage("no se incluye la propiedad email")
    .notEmpty()
    .withMessage("el email no debe de estar vacio")
    .isString()
    .withMessage("la propiedad email debe ser un string")
    .isEmail()
    .withMessage("la propiedad email no tiene el formato de correo"),
  check("password", "Error con el password")
    .exists()
    .withMessage("la propiedad password no esta incluida")
    .notEmpty()
    .withMessage("el password no debe de estar vacio")
    .isString()
    .withMessage("el password debe de ser un string"),
  validateResult,
];

module.exports = { registerUserValidator, loginValidatior };
