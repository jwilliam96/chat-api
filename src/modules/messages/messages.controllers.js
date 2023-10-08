const { Message, User } = require("../../models");

const createConversationMessage = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    const { sendenrId, content } = req.body;

    await Message.create({
      conversationId,
      sendenrId,
      content,
    });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getConversationMessages = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    const messages = await Message.findAll({
      // atrae todos los mensajes que tengan el mismo id de conversacion
      where: { conversationId },
      include: {
        model: User,
        attributes: ["firstname", "lastname", "avatar"],
      },
    });

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversationMessage,
  getConversationMessages,
};
