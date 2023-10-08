const { Router } = require("express"); // importamos las rutas
const {
  createConversation,
  createGroupConversation,
  getAllConversations,
  deleteConversation,
} = require("./conversations.controllers"); // importamos la funsion createConversation
const authenticate = require("../../middlewares/auth.middleware");

const router = Router();

// crear conversaciones
router.post("/", authenticate, createConversation);

// Crear conversaciones grupales
router.post("/group", authenticate, createGroupConversation);

// obtener todas las conversaciones
router
  .route("/:id")
  .get(authenticate, getAllConversations)
  .delete(authenticate, deleteConversation);

// obtener una conversacion con todos los mensajes

module.exports = router;
