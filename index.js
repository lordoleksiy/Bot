const { delData, setData, getById, insertData, updateData1, updateData2, updateData3, updateData4, delById, getByUser } = require('./database')
const { Telegraf, Context } = require('telegraf')
const { delay } = require('bluebird')
const { timejs } = require('datejs')

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

let testDate

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

bot.command('cumout', ctx=>{
  delData(ctx.message.from.id)
  delData(ctx.message.from.id, "tempData")
  ctx.reply("Жаль, что ты оказался слишком слабым...")
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

bot.action('system', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Test',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Вернуться назад", callback_data: "tree"}]
      ]
    }
  })
})

bot.action('best', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Test',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Вернуться назад", callback_data: "tree"}]
      ]
    }
  })
})

bot.action('rank', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Test',
  {
    reply_markup: {
      inline_keyboard: [
        [{text: "Вернуться назад", callback_data: "tree"}]
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
        [{text: "Вернуться назад", callback_data: "alco"}]
      ]
    }
  })
  updateData1(ctx.from.id, new Date())
})

// Запись выпивки. Запись типа алко. Запрос на количество, который обрабатывается в bot.on(message)
bot.action(/writeAlcoStep2./, ctx=>{
  ctx.deleteMessage()
  let data = getById(ctx.from.id)
  let value = getById(ctx.from.id, "tempData", "date")
  value.then(() => {
    value = value._rejectionHandler0
    updateData2(ctx.from.id, alcoObj[parseInt(ctx.update.callback_query.data.slice(-1))], value.date)
    ctx.telegram.sendMessage(ctx.chat.id, 'Напиши, сколько же градусов было в твоем пойле', 
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Вернуться назад", callback_data: "writeAlcoStep1"}]
          ]
        }
      })
  })
})

// Вернуться на главное меню
bot.action('goBack', ctx=>{
  ctx.deleteMessage()
  ctx.telegram.sendMessage(ctx.chat.id, 'Текст, который я потом продумаю', mainObj)
})

// Вывести список и количество алко в 
bot.action('readAlco', ctx=>{
  ctx.deleteMessage()
  let data = getById(ctx.from.id)
  data.then(()=>{
    data = data._rejectionHandler0
    let alco = JSON.parse(data.alco)
    let text = 'Вот твой почетный список:\n'
    for (k in alco){
      if (alco[k] != 0)
        text += `${k} : ${alco[k]} л; \n`
    }
    if (text) {
      text += `\nТы выпил ${parseFloat(data.count.toFixed(2))} мл. этанола`
      ctx.telegram.sendMessage(ctx.chat.id, text,
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Вернуться назад", callback_data: "alco"}]
          ]
        }
      })
    }
    else
      ctx.telegram.sendMessage(ctx.chat.id, "Дитя мое, тебе еще только предстоит познать этот мир...",
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Вернуться назад", callback_data: "alco"}]
          ]
        }
      })
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
  let data = getById(ctx.from.id)
  let value = getById(ctx.from.id, "tempData", "date")
  ctx.deleteMessage()
  data.then(() => {
    data = data._rejectionHandler0
    let days = Math.floor((new Date() - data.date)/1000/3600/24)
    let hours = Math.floor((new Date() - data.date)/1000/3600)
    let daysText = () => {
      if (Math.floor((new Date() - data.date)/1000/3600/24)%10 == 0 ||
      (Math.floor((new Date() - data.date)/1000/3600/24)%10 >= 5 && Math.floor((new Date() - testDate)/1000/3600/24)%10 < 10)) {
        return 'дней'
      } else if (Math.floor((new Date() - data.date)/1000/3600/24)%10 == 1) {
        return 'день'
      } else if (Math.floor((new Date() - data.date)/1000/3600/24)%10 > 1 &&
      Math.floor((new Date() - data.date)/1000/3600/24)%10 < 5) {
        return 'дня'
      }
    }
    let hoursText = () => {
      if (Math.floor((new Date() - data.date)/1000/3600)%10 == 0 ||
      (Math.floor((new Date() - data.date)/1000/3600)%10 >= 5 && Math.floor((new Date() - testDate)/1000/3600)%10 < 10)) {
        return 'часов'
      } else if (Math.floor((new Date() - data.date)/1000/3600)%10 == 1) {
        return 'час'
      } else if (Math.floor((new Date() - data.date)/1000/3600)%10 > 1 && Math.floor((new Date() - testDate)/1000/3600)%10 < 5) {
        return 'часа'
      }
    }
    ctx.telegram.sendMessage(ctx.chat.id, `Ты не пил ${days} ${daysText()}, ${hours} ${hoursText()}. Надо исправлять`,
    {
      reply_markup: {
        inline_keyboard: [
          [{text: "Вернуться назад", callback_data: "alco"}]
        ]
      }
    })
  })
})

// Закрыть менюшку
bot.action('close', ctx=>ctx.deleteMessage())

bot.command('delete', ctx=>{
  delData(ctx.message.from.id)
  ctx.reply("Жаль, что ты оказался слишком слабым...")
})

bot.command('myalco', ctx=>{  // команда, чтоб 
  let data = getById(ctx.message.from.id)
  data.then(()=>{
    data = data._rejectionHandler0
    let alco = JSON.parse(data.alco)
    let text = 'Вот твой почетный список:\n'
    for (k in alco){
      if (alco[k] != 0)
        text += `${k} : ${alco[k]} л; \n`
    }
    if (text) {
      text += `\nТы выпил ${parseFloat(data.count.toFixed(2))} мл. этанола`
      ctx.reply(text)
    }
    else
      ctx.reply("Дитя мое, тебе еще только предстоит познать этот мир...")
  })
})

bot.command('alco', ctx=>{  // команда, чтоб записать количество выпитого алко
  updateData1(ctx.message.from.id, new Date())
  ctx.telegram.sendMessage(ctx.chat.id, 
  `Вспомни наши 8 заповедей и назови ту, которой сегодня ты следовал, ах да вот же они:\n
  1. пиво/сидр,
  2. шейк/ром-кола/рево/подобное, 
  3. водка,
  4. ром,
  5. егерь/крепкий ликер/джин/аристократическая хуйня, 
  6. вино,
  7. портвейн,
  8. ликеры`, {
    reply_markup: { inline_keyboard: [[{text: "Отмена", callback_data: "cancel"}]]}
  })
})

bot.command('alco', ctx=>{  // команда, чтоб записать количество выпитого алко
  updateData1(ctx.message.from.id, new Date())
  ctx.telegram.sendMessage(ctx.chat.id, 
  `Вспомни наши 8 заповедей и назови ту, которой сегодня ты следовал, ах да вот же они:\n
  1. пиво/сидр,
  2. шейк/ром-кола/рево/подобное, 
  3. водка,
  4. ром,
  5. егерь/крепкий ликер/джин/аристократическая хуйня, 
  6. вино,
  7. портвейн,
  8. ликеры`, {
    reply_markup: { inline_keyboard: [[{text: "Отмена", callback_data: "cancel"}]]}
  })
})

bot.command('myalco', ctx=>{  // команда, чтоб 
  let data = getById(ctx.message.from.id)
  data.then(()=>{
    data = data._rejectionHandler0
    let alco = JSON.parse(data.alco)
    let text = 'Вот твой почетный список:\n'
    for (k in alco){
      if (alco[k] != 0)
        text += `${k} : ${alco[k]} л; \n`
    }
    if (text) {
      text += `\nТы выпил ${parseFloat(data.count.toFixed(2))} мл. этанола`
      ctx.reply(text)
    }
    else
      ctx.reply("Дитя мое, тебе еще только предстоит познать этот мир...")
  })
})

bot.command('alcof', ctx=>{
  let text = ctx.message.text.split(' ')[1]
  if (text){
    if (text[0] == '@')
      text = text.slice(1)
    let value = getByUser(text)
    value.then(()=>{
      value = value._rejectionHandler0
      if (value){
        let alco = JSON.parse(value.alco)
        text = 'Почетный список твоего собрата:\n'
        for (k in alco){
          if (alco[k] != 0)
            text += `${k} : ${alco[k]} л; \n`
        }
        if (text) {
          text += `\nТвой собрат выпил ${parseFloat(value.count.toFixed(2))} мл. этанола`
          ctx.reply(text)
        }
        else
          ctx.reply('Твоему собрату еще только предстоит познать этот мир. Помоги сделать ему этот нелегкий шаг. Обсуди с ним, насколько вы сильно любите нашу секту за чашечкой водки')
      }
      else
      ctx.reply('Твоему собрату еще только предстоит познать этот мир. Помоги сделать ему этот нелегкий шаг. Пригласи его в нашу секту и помоги ему тут обосновоться')
    })
  }
  else
  ctx.reply('Из-за таких, как ты, нашу веру ущемляют')
})

bot.command('time', ctx=>{
  let value = getById(ctx.message.from.id)
  value.then(()=>{
    value = value._rejectionHandler0
    const date = new Date(parseInt(value.date))
    const date1 = date.toString("dd/MM/y")
    const date2 = date.toString("HH:mm:ss")
    ctx.reply(`Время последнего испитого вами бокала: ${date1} в ${date2}`)
  })
})

bot.action('cancel', ctx=>{
  let value = getById(ctx.from.id, "tempData", "date")
  value.then(()=>{
    delById(ctx.from.id, value._rejectionHandler0.date)
    ctx.deleteMessage()
  })
})

bot.on('message', ctx=>{
  let data = getById(ctx.message.from.id)  // данные с таблицы alcoData
  let value = getById(ctx.message.from.id, "tempData", "date")  // данные с таблицы tempData
  value.then(()=> {
    value = value._rejectionHandler0
    switch (value.stage){  // этап
      case 0:
        if (ctx.message.text in alcoObj){
          updateData2(ctx.message.from.id, alcoObj[ctx.message.text], value.date)
          ctx.telegram.sendMessage(ctx.chat.id, 'Какой выдержки было твое пойло? Напиши значение в градусах.', {
              reply_markup: { inline_keyboard: [[{text: "Отмена", callback_data: "cancel"}]]}
          })
        }
        else
          delById(ctx.message.from.id, value.date)
        ctx.deleteMessage(ctx.message.message_id-1)
        ctx.deleteMessage()
        break
      case 1:
        if (parseInt(ctx.message.text) <= 100 && parseInt(ctx.message.text) > 0) {
          updateData3(ctx.message.from.id, ctx.message.text, value.date)
          ctx.telegram.sendMessage(ctx.chat.id, 'Каким объемом выпитого ты нас порадуешь? Укажи значение в милилитрах.', {
            reply_markup: { inline_keyboard: [[{text: "Отмена", callback_data: "cancel"}]]}
          })
        }
        else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Введи нормально, пожалуйста. Глупые в нашей секте долго не держатся. И все же, сколько градусов?', {
            reply_markup: { inline_keyboard: [[{text: "Отмена", callback_data: "cancel"}]]}
          })
        }
        ctx.deleteMessage(ctx.message.message_id-1)
        ctx.deleteMessage()
        break

      case 2:
        if (parseInt(ctx.message.text) <= 10000 && parseInt(ctx.message.text) > 0) {
          updateData4(ctx.message.from.id, ctx.message.text, value.date)
          data = data._rejectionHandler0
          let alco = JSON.parse(data.alco)

          alco[value.alco] += parseInt(ctx.message.text)/1000
          let etanol = parseInt(ctx.message.text)*value.gradus/100

          setData(ctx.message.from.id, data.count + etanol, JSON.stringify(alco), value.date, 0, null)
          ctx.reply('Дитя мое, ты не перестаешь меня радовать')
          ctx.reply(`Твой сегодняшний вклад: ${value.alco}: ${parseInt(ctx.message.text)/1000} л. или ${etanol} мл. этанола`)
        }
        else {
          ctx.telegram.sendMessage(ctx.chat.id, 'Введи нормально, пожалуйста. Глупые в нашей секте долго не держатся. И все же, сколько милилитров?', {
            reply_markup: { inline_keyboard: [[{text: "Отмена", callback_data: "cancel"}]]}
          })
        }
        ctx.deleteMessage(ctx.message.message_id-1)
        ctx.deleteMessage(ctx.message.message_id)
    }
  })
})

bot.launch()