const { Telegraf } = require('telegraf')

// const bot = new Telegraf("5290656003:AAHs-MnL_wUOwDh18i-xgfxUx-JdPxSZ30c")
const bot = new Telegraf('5245083579:AAE1zVoOVn3g16LNczlx4SE7Nv1KBMWQqiQ')

bot.start(async ctx=>{
  ctx.reply("Ярык хуй моржовый")
  console.log(await ctx.telegram.getChat(ctx.message.chat.id))
})

bot.on('message', (ctx)=> {
  console.log(ctx.message)
  ctx.telegram.sendMessage(ctx.message.chat.id, "Well Cum!")
});

bot.launch()