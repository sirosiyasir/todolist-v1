/* çalışması için node_modules , express , body-parser ve ejs npm'lerini indirin
daha sonra nodemon app.js komutuyla (hyper vb) local host 3000'de açın
nodemon app.js komutu çalışmıyorsa npx nodemon app 'i deneyin*/

const express = require("express")
const bodyParser = require("body-parser")

const app = express()

/* item değişkeni post'un içerisinde oluşturuldu lakin server'ı onu tarayana kadar item is not defined diyeceği için burada boş
bir item değişkeni oluştururyoruz */
var items = ["Eat lunch", "Walk the dog", "Clean home"]

// express'le ejs'i ekledik "https://github.com/mde/ejs/wiki/Using-EJS-with-Express"
app.set("view engine", "ejs")

// bodyParser'ı kuruyoruz
app.use(bodyParser.urlencoded({ extended: true }))
/* public klasörüne css'imizi(istersek images faviconu vb dosyaları da koyabiliriz) koyduk ve app.use'la
express'e çalıştırmasını söyledik(statik diyerek statik olarak çalıştırmasını söyledik) */
app.use(express.static("public"))

app.get("/", function (req, res) {
  var today = new Date()

  // Javascript object
  let options = {
    weekday: "long", // gün ismi uzun haliyle yazılır 4.gün to Thursday
    day: "numeric", // ayın kaçıncı günü olduğunu ismiyle değil sayıyla yazar
    month: "long", // ayı sayıyla değil ismiyle uazar
  }

  var day = today.toLocaleDateString("tr-TR", options)

  /*
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

   switch (currentDay) {
    case 0:
      day = "";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Sunday";
      break;
      default: console.log("Error: current day is equal to: " + currentDay);
  } */

  /* views klasöründe list adında bir dosya aramasını söylüyor ve
   bu dosyanın içerisindeki kindOfDay'in , day variable'ına eşit olduğunu söylüyoruz */
  res.render("list", { kindOfDay: day, newListItems: items })
})

/* post isteği yapıldığında (html'deki form) o post isteğini yakalıyoruz
 ve istek sonucunda gerçekleşmesini istediğimiz kodu yazıyoruz */
app.post("/", function (req, res) {
  /* posta istek yapıldığı zaman body-parser sayesinde yapılan post istediğindeki
   name'leri yakalıyoruz */
  var item = req.body.newItem
  items.push(item)
  // post isteği yapıldığı zaman '/' a yani app.get'e yönlendirecek bu da serverin yeniden app.geti'i döndürmesini sağlauacak
  res.redirect("/")
})

app.listen(3000, function () {
  console.log("server is running on port 3000")
})
