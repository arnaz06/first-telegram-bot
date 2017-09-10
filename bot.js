var Q = require('q')
var request = Q.denodeify(require("request"))
var TelegramBot = require('node-telegram-bot-api')
var token = '302015142:AAEaQsy3zAmFZNu2_doxCjl-_0qEQ7c5nHQ'


var bot = new TelegramBot(token, {polling:true})

bot.getMe().then(function(me) {
  console.log('Halo nama saya sikun');
})

bot.onText(/\/start/,function (msg,match) {
  var fromId = msg.from.id
  var message = "Selamat datang di sikun_bot\n"
  message+="ketik /cuaca [longitude latitude] untuk mendapatkan informasi tentang itu."
  bot.sendMessage(fromId,message)
})

bot.onText(/\/cuaca (.+) (.+)/,function (msg,match) {
  var fromId = msg.from.id
  var long = match[1]
  var lat = match[2]

  console.log(long,lat)
  getWeatherData(long, lat)
  .then(function(data){
    var message= "saya akan melihat cuaca berdasarkan longitude "+long+" dan latitude "+lat+"\n"
    message += "cuacanya "+data.wx_desc+"\n"
    message += "Temp "+data.temp_c+"C atau "+data.temp_f+"F"
    bot.sendMessage(fromId,message)
  })
})

function getWeatherData(long,lat){
  var app_id="b909e54e"
  var app_key="b7bb3b351b6d05ca3864b800d285eb15"
  var url = "http://api.weatherunlocked.com/api/current/"+long+","+lat
  url += "?app_id="+app_id+"&app_key="+app_key

  var options = {
    url: url,
    method: "GET",
    json: true,
  }
  var response = request(options);
  return response.then(function(r) {
    return r[0].body
  })
}
