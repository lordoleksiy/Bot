const { delData, setData, getById, insertData } = require('./database')
const { Database } = require('sqlite3')
const { Telegraf, Context } = require('telegraf')
const { delay } = require('bluebird')


const bot = new Telegraf("5290656003:AAHs-MnL_wUOwDh18i-xgfxUx-JdPxSZ30c")
bot.start( async ctx=>{
  if (await ctx.getChatMembersCount(ctx.chat.id) > 2) {
    ctx.reply(`Здравствуйте, мои дети! Мы приветствуем вас в секте "Свидетели Разлива Пива"`)
    ctx.reply('Если ты хочешь стать полноправным членом нашего культа тебе всего лишь нужно ввести команду /cum_in')
  }
  else { 
    ctx.reply(`Здравствуй, последователь ${ctx.chat.first_name}! Мы рады видеть тебя в секте "Свидетели Разлива Пива"`)
    insertData(ctx.message.from.id)
  }
})

bot.command('cumin', ctx=>{
  if (ctx.message.from.username != "fuckingburner" || ctx.message.from.username != "fuckinburner")
    ctx.reply(`${ctx.message.from.first_name}, мы рады видеть тебя в свой секте "Свидетели Разлива Пива"`)
  else
    ctx.reply(`${ctx.message.from.first_name}, мы не рады видеть тебя в свой секте "Свидетели Разлива Пива", но хуй с тобой - присоединяйся`)
  insertData(ctx.message.from.id)
})

bot.on('message', ()=>{
  const value = getById(1)
  value.then(()=> {
    const personData = value._rejectionHandler0

  })
})

bot.launch()