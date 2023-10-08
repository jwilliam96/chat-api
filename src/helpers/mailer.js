const nodemailer = require("nodemailer");
require("dotenv").config();

// nuestro transportador para enviar mensajes al correo
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // servidor de correo eletrinico que vamos a utilizar
  port: 465, // el puerto
  secure: true, // nos pregunta si es seguro
  auth: {
    // nos pide nuestras credenciales
    user: process.env.G_USER,
    pass: process.env.G_PASSWORD,
  },
});

module.exports = transporter;
