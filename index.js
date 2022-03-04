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

// Основое меню
bot.command('alcobot', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Текст, который я потом продумаю', 
  mainObj = {
    reply_markup: {
      inline_keyboard: [
        [{text: "Выпивка", callback_data: "alco"}],
        [{text: "Древо нашей секты", callback_data: "tree"}],
        [{text: "Моя миссия", callback_data: "task"}],
        [{text: "Помощь", callback_data: "help"}, {text: "Закрыть", callback_data: "close"}]
      ]
    }
  })
})

// Меню выпивки
bot.action('alco', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Дети мои, это вкладка наполнит ваши умы смыслом',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Записать откровение", callback_data: "writeAlcoStep1"}],
        [{text: "Заглянуть в прошлое", callback_data: "readAlco"},
        {text: "Дней без боя", callback_data: "date"}],        
        [{text: "Заглянуть в прошлое сочлена", callback_data: "readAlcoOf"}],
        [{text: "Дней без боя сочлена", callback_data: "dateOf"}],
        [{text: "Вернуться назад", callback_data: "goBack"}]
      ]
    }
  })
})

// Меню Древо нашей секты 
bot.action('tree', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Дитя моё, вот и ',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Узнать свой сан", callback_data: "rank"}],
        [{text: "Устрой секты", callback_data: "system"},
        {text: "Узреть лучших", callback_data: "best"}],
        [{text: "Вернуться назад", callback_data: "goBack"}]
      ]
    }
  })
})

// Меню Моя миссия
bot.action('task', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Бог поможет',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Взяться за поручение", callback_data: "getTask"},
        {text: "Пропустить поручение", callback_data: "skipTask"}],
        [{text: "Моя миссия", callback_data: "myTask"},
        {text: "Предложить поручение", callback_data: "offerTask"}],
        [{text: "Вернуться назад", callback_data: "goBack"}]
      ]
    }
  })
})

// Запись выпивки. Выбор типа алко по кнопкам
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

// Запись выпивки. Запись типа алко. Запрос на количество, который обрабатывается в bot.on(message)
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

// Вернуться на главное меню
bot.action('goBack', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Текст, который я потом продумаю', mainObj)
})

// Считывание количества и градуса алко
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

// Запись даты последнего раза
bot.action('writeAlcoStep3', ctx=>{
  ctx.deleteMessage()
  testDate = new Date()
  console.log(testDate)
  // Тут будет прописана логика записи объекта в базу данных
})

// Вывести список и количество алко в 
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

// Помощь.
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

// Вывод "сколько дней не пил"
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

// Закрыть менюшку
bot.action('close', ctx=>ctx.deleteMessage())

// bot.on('message', (ctx)=> {
//   console.log(ctx.message)
//   bot.telegram.sendMessage(ctx.message.chat.id, "It's so inetersing...")
// });

bot.launch()