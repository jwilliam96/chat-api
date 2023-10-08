const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const userRoutes = require("../modules/user/user.routes");
const conversationsRoutes = require("../modules/conversations/conversations.routes");
const messageRoutes = require("../modules/messages/message.routes");

const apiv1Routes = (app) => {
  app.use("/api/v1/users", userRoutes); // version 1/ atrae todas las rutas del user.routes.js
  app.use("/api/v1/conversations", conversationsRoutes); // version 1/ atrae todas las rutas del conversations.routes.js
  app.use("/api/v1/messages", messageRoutes); // atrae todas las rutas de messages
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // debera ser capaz de visualizar la documentacion
};

module.exports = apiv1Routes;
