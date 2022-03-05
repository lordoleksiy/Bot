const { delData, setData, getById, insertData, updateData1, updateData2, updateData3, updateData4 } = require('./database')
const { Database } = require('sqlite3')
const { Telegraf, Context } = require('telegraf')
const { delay } = require('bluebird')

let alcoObj = {
  1: 'пиво/сидр',
  2: 'шейк/ром-кола/рево/подобное', 
  3: 'водка',
  4: 'ром',
  5: 'егерь/крепкий ликер/джин/аристократическая хуйня', 
  6: 'вино',
  7: 'портвейн',
  8: 'ликеры'
}

const bot = new Telegraf("5290656003:AAHs-MnL_wUOwDh18i-xgfxUx-JdPxSZ30c")
bot.start( async ctx=>{
  if (await ctx.getChatMembersCount(ctx.chat.id) > 2) {
    ctx.reply(`Здравствуйте, мои дети! Мы приветствуем вас в секте "Свидетели Разлива Пива"`)
    ctx.reply('Если ты хочешь стать полноправным членом нашего культа тебе всего лишь нужно ввести команду /cum_in')
  }
  else { 
    ctx.reply(`Здравствуй, последователь ${ctx.chat.first_name}! Мы рады видеть тебя в секте "Свидетели Разлива Пива"`)
    insertData(ctx.message.from.id, ctx.message.from.username)
  }
})

bot.command('cumin', ctx=>{
  if (ctx.message.from.username != "fuckingburner" || ctx.message.from.username != "fuckinburner")
    ctx.reply(`${ctx.message.from.first_name}, мы рады видеть тебя в свой секте "Свидетели Разлива Пива"`)
  else
    ctx.reply(`${ctx.message.from.first_name}, мы не рады видеть тебя в свой секте "Свидетели Разлива Пива", но хуй с тобой - присоединяйся`)
  insertData(ctx.message.from.id, ctx.message.from.username)
})


bot.command('alco', ctx=>{  // команда, чтоб записать количество выпитого алко
  ctx.reply('Вспомни наши 8 заповедей и назови ту, которой сегодня ты следовал, ах да вот же они: ')
  ctx.reply(`1. пиво/сидр,
2. шейк/ром-кола/рево/подобное, 
3. водка,
4. ром,
5. егерь/крепкий ликер/джин/аристократическая хуйня, 
6. вино,
7. портвейн,
8. ликеры`)
  updateData1(ctx.message.from.id)
})


bot.command('delete', (ctx)=>{
  delData(ctx.message.from.id)
})


bot.on('message', ctx=>{
  let data = getById(ctx.message.from.id)
  let value = getById(ctx.message.from.id, "tempData")
  value.then(()=> {
    value = value._rejectionHandler0
    let stage = value.stage
    switch (stage){
      case 0:
        updateData2(ctx.message.from.id, alcoObj[ctx.message.text])
        ctx.reply("Ок, какой выдержки было твое пойло? (в градусах)")
        break
      case 1:
        updateData3(ctx.message.from.id, ctx.message.text)
        ctx.reply("Скок выпил?")
        break
      case 2:
        updateData4(ctx.message.from.id, ctx.message.text)
        data = data._rejectionHandler0
        let alco = JSON.parse(data.alco)
        alco[value.alco] += parseInt(ctx.message.text)
        setData(ctx.message.from.id, parseInt(ctx.message.text)*value.gradus/100, JSON.stringify(alco), null, 0, null)    
    }
  })
})

bot.launch()