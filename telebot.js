const TelegramBot = require('node-telegram-bot-api');

// replace with your own token
const token = 'YOUR_TOKEN';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello World!');
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! How can I help you today?');
});
