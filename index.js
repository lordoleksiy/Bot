const { Telegraf, Context } = require('telegraf')

const bot = new Telegraf("5290656003:AAHs-MnL_wUOwDh18i-xgfxUx-JdPxSZ30c")
bot.start( async ctx=>{
  if (await ctx.getChatMembersCount(ctx.chat.id) > 2) {
    ctx.reply(`Здравствуйте, мои дети! Мы приветствуем вас в секте "Свидетели Разлива Пива"`)
    ctx.reply('Если ты хочешь стать полноправным членом нашего культа тебе всего лишь нужно ввести команду /cum_in')
  }
  else ctx.reply(`Здравствуй, последователь ${ctx.chat.first_name}! Мы приветствуем тебя в секте "Свидетели Разлива Пива"`)
})

bot.command('cum_in', ctx=>{
  if (ctx.message.from.username != "fuckingburner" || ctx.message.from.username != "fuckinburner")
    ctx.reply(`${ctx.message.from.first_name}, мы рады видеть тебя в свой секте "Свидетели Разлива Пива"`)
  else
   ctx.reply(`${ctx.message.from.first_name}, мы не рады видеть тебя в свой секте "Свидетели Разлива Пива", но хуй с тобой - присоединяйся`)
})

// bot.on('message', (ctx)=> {
//   console.log(ctx.message)
//   bot.telegram.sendMessage(ctx.message.chat.id, "It's so inetersing...")
// });

bot.launch()