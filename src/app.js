const path = require("path");
const express = require("express"); // esto es importar con cjs common java script
const morgan = require("morgan");
const cors = require("cors");
const apiv1Routes = require("./routes/apiv1.routes.js");
const errorRoutes = require("./routes/error.router");
require("dotenv").config();

const PORT = process.env.PORT ?? 8001;

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/avatar", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("OK");
});

apiv1Routes(app); // aqui estan todas las rutas de nuestra api version 1

// los middleware de error los ubicamos despues de todas nuestras rutas ose de ultimas
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});
