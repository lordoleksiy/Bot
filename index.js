const { Telegraf } = require('telegraf')

const bot = new Telegraf("5290656003:AAHs-MnL_wUOwDh18i-xgfxUx-JdPxSZ30c")

bot.start(ctx=>{ctx.reply("Ярык хуй моржовый")})

bot.on('message', (message)=> {
  console.log(message)
  bot.sendMessage(message.chat.id, "Well Cum!")
});

bot.launch()