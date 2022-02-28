const TelegramBot = require('node-telegram-bot-api');
const token = '5290656003:AAHs-MnL_wUOwDh18i-xgfxUx-JdPxSZ30c';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, молоді геї!');
  });