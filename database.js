const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird')

let alcoObj = {
    'пиво/сидр': 0,
    'шейк/ром-кола/рево/подобное':0, 
    'водка': 0,
    'ром': 0,
    'егерь/крепкий ликер/джин/аристократическая хуйня': 0, 
    'вино': 0,
    'портвейн': 0,
    'ликеры': 0
  }

const db = new sqlite3.Database("./data.db", err=>{
    if (err) console.log("Ебать, ложись! Ошибка вылетела, щас бомбить начнут. " + err.message)
    else console.log("Мы подключились к этой сучке!")
})

function insertData(id, username=null, count=0, alco=JSON.stringify(alcoObj), date=null, score=0, task=null){
    const value = getById(id)
    value.then(()=> {
        if (value._rejectionHandler0==undefined){
            db.run('INSERT INTO alcodata(id, count, alco, date, score, task, username) VALUES (?, ?, ?, ?, ?, ?, ?)', [id, count, alco, date, score, task, username], err => {
                if (err) console.log("У тебя член маленький. " + err.message)
                else console.log("Вставил ты ей хорошеично. ")
            })      
        }
    })
}

function delData(id){
    db.run("DELETE FROM alcodata where id == (?)", [id], err=>{
        if (err) console.log("Шеф, вы проебались конкретно " + err.message)
        else console.log("Эта хуйня улетела от сюда")
    })
}

function setData(id, count, alco, date, score, task=undefined){  // если у человка поменяется юзернейм то надо обновить данные
    if (task != undefined)
        db.run("UPDATE alcodata SET count = ?, alco = ?, date = ?, score = ?, task = ? WHERE id = ?", [count, alco, date, score, task, id])
    else
        db.run("UPDATE alcodata SET count = ?, alco = ?, date = ?, score = ? WHERE id = ?", [count, alco, date, score, id])
}

function getById(id) {
    return new Promise((resolve, reject) => {
    db.get("SELECT * FROM alcodata where id == (?)", [id], (err, result) => {
        if (err) {
        console.log('Error running sql: ' + err.message)
        reject(err)
        } else resolve(result)
    })
    })
}

// db.run("CREATE TABLE alcodata(id integer not null, count integer not null, alco text not null, date text, score integer, task text, username text)")
// db.run("DELETE TABLE alcodata")


module.exports.insertData = insertData
module.exports.delData = delData
module.exports.setData = setData
module.exports.getById = getById
