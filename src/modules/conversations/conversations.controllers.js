const { Conversation, User, Participant, Message } = require("../../models"); // atraemos el modelo de Conversation/ este lo atrae del index.js de los modelos

const createConversation = async (req, res, next) => {
  try {
    const { userId, participantId } = req.body; // tomamos del body la info de userId  y participantId

    // creo la conversacion
    const conversation = await Conversation.create({ createdBy: userId });

    // agregar a los participantes a la conversacion --> creandolos en la tabla pivote

    const user = await User.findByPk(userId);
    const participant = await User.findByPk(participantId);
    await conversation.addUser(user);
    await conversation.addUser(participant);
    res.status(201).end();
  } catch (error) {
    next(error); // pasamos algun error que haya
  }
};

// conversacion en grupo
const createGroupConversation = async (req, res, next) => {
  try {
    // cuantos participantes se va a enviar cuando se crea el grupo
    const { userId, participantsIds, title } = req.body;
    const conversation = await Conversation.create({
      createdBy: userId,
      title,
      type: "group",
    });

    // necesitamos agregar a los participantes en la tabla pivote
    // {UserId, ConversationId}
    // de esta manera convertimos los participantes en un areglo
    const createParticipants = [...participantsIds, userId].map(
      (participant) => ({
        ConversationId: conversation.id,
        UserId: participant,
      })
    );

    await Participant.bulkCreate(createParticipants);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

const getAllConversations = async (req, res, next) => {
  try {
    const { id } = req.params; // envio el id del usuario que voy a enviar como parametro

    // busca en la base de datos donde ese usuario participe en una conversacion
    const conversations = await Participant.findAll({
      where: { UserId: id },
      include: {
        model: Conversation,
        include: {
          model: Participant,
          attributes: ["UserId"],
          include: {
            model: User,
            attributes: ["firstname", "lastname", "avatar"],
          },
        },
      },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Message.destroy({ where: { conversationId: id } });
    await Participant.destroy({ where: { ConversationId: id } });
    await Conversation.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createConversation,
  createGroupConversation,
  getAllConversations,
  deleteConversation,
}; // exportamos
