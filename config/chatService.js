import connectDB from "./db";
import Chat from "@/models/Chat";

if (!global._localChats) {
  global._localChats = [];
}

const DEFAULT_USER_ID = "dummy_user_123";

export async function createChat(userId = DEFAULT_USER_ID, name = "New Chat") {
  const conn = await connectDB();
  if (conn) {
    return await Chat.create({
      userId,
      messages: [],
      name,
    });
  }

  const newChat = {
    _id: "local_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
    userId,
    name,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  global._localChats.push(newChat);
  return newChat;
}

export async function getUserChats(userId = DEFAULT_USER_ID) {
  const conn = await connectDB();
  if (conn) {
    return await Chat.find({ userId });
  }

  return global._localChats.filter((chat) => chat.userId === userId);
}

export async function getChatById(chatId, userId = DEFAULT_USER_ID) {
  const conn = await connectDB();
  if (conn) {
    return await Chat.findOne({ _id: chatId, userId });
  }

  return global._localChats.find((chat) => chat._id === chatId && chat.userId === userId) || null;
}

export async function addMessageToChat(chatId, message, userId = DEFAULT_USER_ID) {
  const conn = await connectDB();
  if (conn) {
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) return null;
    chat.messages.push(message);
    await chat.save();
    return chat;
  }

  const chat = global._localChats.find((c) => c._id === chatId && c.userId === userId);
  if (!chat) return null;
  chat.messages.push(message);
  chat.updatedAt = new Date().toISOString();
  return chat;
}

export async function deleteChat(chatId, userId = DEFAULT_USER_ID) {
  const conn = await connectDB();
  if (conn) {
    return await Chat.deleteOne({ _id: chatId, userId });
  }

  const initialLen = global._localChats.length;
  global._localChats = global._localChats.filter(
    (c) => !(c._id === chatId && c.userId === userId)
  );
  return { deletedCount: initialLen - global._localChats.length };
}

export async function renameChat(chatId, name, userId = DEFAULT_USER_ID) {
  const conn = await connectDB();
  if (conn) {
    return await Chat.findOneAndUpdate({ _id: chatId, userId }, { name }, { new: true });
  }

  const chat = global._localChats.find((c) => c._id === chatId && c.userId === userId);
  if (chat) {
    chat.name = name;
    chat.updatedAt = new Date().toISOString();
  }
  return chat;
}
