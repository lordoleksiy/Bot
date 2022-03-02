let isWaiting1 = false
let isWaiting2 = false

let testObj = {
  type: 'test',
  gradus: 0,
  number: 0
}
let testDate

const { Telegraf } = require('telegraf')

const bot = new Telegraf("5245083579:AAE1zVoOVn3g16LNczlx4SE7Nv1KBMWQqiQ")
bot.start( async ctx=>{
  if (await ctx.getChatMembersCount(ctx.chat.id) > 2) {
    ctx.reply(`Здравствуйте, мои дети! Мы приветствуем вас в секте "Свидетели Разлива Пива"`)
    ctx.reply('Если ты хочешь стать полноправным членом нашего культа тебе всего лишь нужно ввести команду /cum_in')
  }
  else ctx.reply(`Здравствуй, последователь ${ctx.chat.first_name}! Мы приветствуем тебя в секте "Свидетели Разлива Пива"`)
})

bot.command('cumin', ctx=>{
  if (ctx.message.from.username != "fuckingburner" || ctx.message.from.username != "fuckinburner")
    ctx.reply(`${ctx.message.from.first_name}, мы рады видеть тебя в свой секте "Свидетели Разлива Пива"`)
  else
   ctx.reply(`${ctx.message.from.first_name}, мы не рады видеть тебя в свой секте "Свидетели Разлива Пива", но хуй с тобой - присоединяйся`)
})

bot.command('alcobot', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Текст, который я потом продумаю', 
  mainObj = {
    reply_markup: {
      inline_keyboard: [
        [{text: "Выпивка", callback_data: "writeAlcoStep1"}],
        [{text: "Заархивировать выпитый мной алкоголь", callback_data: "writeAlcoStep1"}, 
        {text: "Что я уже выпил?", callback_data: "readAlco"}],
        [{text: "Сколько дней я не пил?", callback_data: "date"}],
        [{text: "Помощь", callback_data: "help"}, {text: "Закрыть", callback_data: "close"}]
      ]
    }
  })
})

bot.action('writeAlcoStep1', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 
    `
      Выбери тип выпитого алкоголя
    1. пиво/сидр
    2. шейк/ром-кола/рево/подобное 
    3. водка
    4. ром
    5. егерь/крепкий ликер/джин/аристократическая хуйня
    6. вино
    7. портвейн
    8. ликеры
    `, 
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "1", callback_data: "writeAlcoStep21"}, {text: "2", callback_data: "writeAlcoStep22"},
        {text: "3", callback_data: "writeAlcoStep23"}, {text: "4", callback_data: "writeAlcoStep24"},
        {text: "5", callback_data: "writeAlcoStep25"}, {text: "6", callback_data: "writeAlcoStep26"},
        {text: "7", callback_data: "writeAlcoStep27"}, {text: "8", callback_data: "writeAlcoStep28"}],
        [{text: "Вернуться назад", callback_data: "goBack"}]
      ]
    }
  })
})

bot.action(/writeAlcoStep2./, ctx=>{
  ctx.deleteMessage()
  console.log()
  switch (ctx.update.callback_query.data) {
    case "writeAlcoStep21":
      testObj.type = "пиво/сидр"
      break
    case "writeAlcoStep22":
      testObj.type = "шейк/ром-кола/рево/подобное"
      break
    case "writeAlcoStep23":
      testObj.type = "водка"
      break
    case "writeAlcoStep24":
      testObj.type = "ром"
      break
    case "writeAlcoStep25":
      testObj.type = "егерь/крепкий ликер/джин/аристократическая хуйня"
      break
    case "writeAlcoStep26":
      testObj.type = "вино"
      break
    case "writeAlcoStep27":
      testObj.type = "портвейн"
      break
    case "writeAlcoStep28":
      testObj.type = "ликеры"
      break
  }
  ctx.telegram.sendMessage(ctx.chat.id, 'Напиши, сколько же градусов было в твоем пойле', 
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Вернуться назад", callback_data: "writeAlcoStep1"}]
      ]
    }
  })
  isWaiting1 = true;
})

bot.action('goBack', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Текст, который я потом продумаю', mainObj)
})

bot.on('message', ctx=>{
  if (isWaiting1) {
    testObj.gradus = ctx.message.text
    ctx.deleteMessage(ctx.message.message_id - 1)
    ctx.deleteMessage(ctx.message.message_id)

    ctx.telegram.sendMessage(ctx.chat.id, 'А сколько выпил то?', 
    {
      reply_markup: {
        inline_keyboard: [
          [{text: "Вернуться назад", callback_data: "writeAlcoStep1"}]
        ]
      }
    })

    isWaiting1 = false
    isWaiting2 = true
  } else if (isWaiting2) {
    testObj.number = ctx.message.text
    ctx.deleteMessage(ctx.message.message_id - 1)
    ctx.deleteMessage(ctx.message.message_id)

    ctx.telegram.sendMessage(ctx.chat.id, 
      `Окей, подитожим. Ты выпил ${testObj.number} миллилитров ${testObj.gradus}-градусного ${testObj.type}`,
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Да", callback_data: "writeAlcoStep3"}],
            [{text: "Вернуться назад", callback_data: "writeAlcoStep2"}]
          ]
        }
      })
    isWaiting2 = false
  }
})

bot.action('writeAlcoStep3', ctx=>{
  ctx.deleteMessage()
  testDate = new Date()
  console.log(testDate)
  // Тут будет прописана логика записи объекта в базу данных
})

bot.action('readAlco', ctx=>{
  ctx.deleteMessage()
  // Сюды надо прописать нормальный вывод из бд
  ctx.telegram.sendMessage(ctx.chat.id, testObj, 
    {
      reply_markup: {
        inline_keyboard: [
          [{text: "Вернуться назад", callback_data: "goBack"}]
        ]
      }
    })
})

bot.action('help', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Бог поможет',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Вернуться назад", callback_data: "goBack"}]
      ]
    }
  })
})

bot.action('date', ctx=>{
  ctx.deleteMessage()
  // Надо продумать, не гребу, как эту херню представить адекватно в днях
  ctx.telegram.sendMessage(ctx.chat.id, `Ты не пил ${Math.floor((new Date() - testDate)/1000)} секунд`,
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Вернуться назад", callback_data: "goBack"}]
      ]
    }
  })
})

bot.action('close', ctx=>ctx.deleteMessage())

// bot.on('message', (ctx)=> {
//   console.log(ctx.message)
//   bot.telegram.sendMessage(ctx.message.chat.id, "It's so inetersing...")
// });

bot.launch()