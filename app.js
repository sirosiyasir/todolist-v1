/* çalışması için node_modules , express , body-parser ve ejs npm'lerini indirin
daha sonra nodemon app.js komutuyla (hyper vb) local host 3000'de açın
nodemon app.js komutu çalışmıyorsa npx nodemon app 'i deneyin*/

const express = require("express")
const bodyParser = require("body-parser")

// date.js'den export ettik
const date = require(__dirname + "/date.js")

const app = express()

/* item değişkeni post'un içerisinde oluşturuldu lakin server'ı onu tarayana kadar item is not defined diyeceği için burada boş
bir item değişkeni oluştururyoruz */
const items = ["Eat lunch", "Walk the dog", "Clean home"]
const workItems = []

// express'le ejs'i ekledik "https://github.com/mde/ejs/wiki/Using-EJS-with-Express"
app.set("view engine", "ejs")

// bodyParser'ı kuruyoruz
app.use(bodyParser.urlencoded({ extended: true }))
/* public klasörüne css'imizi(istersek images faviconu vb dosyaları da koyabiliriz) koyduk ve app.use'la
express'e çalıştırmasını söyledik(statik diyerek statik olarak çalıştırmasını söyledik) */
app.use(express.static("public"))

app.get("/", function (req, res) {
  
  /* eğer const date'den import ettiğimiz /date.js klasöründe birden fazla fonksiyon varsa let day = date.getDay şeklinde yani çağırmak date'den çağırmak istediğim function
  getDay functionu diyerek yapmalıyız. Eğer tek bir function varsa yalnızca let day = date şeklinde yapabiliriz */
  let day = date.getDay()

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

  /* views klasöründe list adında bir dosya aramasını söylüyor ve bu dosyanın içerisindeki kindOfDay'in , day variable'ına eşit olduğunu söylüyoruz */
  res.render("list", { listTitle: day, newListItems: items })
})

/* post isteği yapıldığında (html'deki form) o post isteğini yakalıyoruz
 ve istek sonucunda gerçekleşmesini istediğimiz kodu yazıyoruz */
app.post("/", function (req, res) {

  /* posta istek yapıldığı zaman body-parser sayesinde yapılan post istediğindeki
   name'leri yakalıyoruz */
  let item = req.body.newItem
   
  // burada req.body.list === "Work" html'deki button'un valuesinde mevcuttur
  // Ayrıca burada "Work List"i değil de yalnızca work'ü aramamızın sebebi console'un karşılaştırma için yalnızca ilk kelimeleri almasıdır
  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    // post isteği yapıldığı zaman '/' a yani app.get'e yönlendirecek bu da serverin yeniden app.geti'i döndürmesini sağlauacak
    res.redirect("/")
  }

})

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems })
})

/* Work List */
app.post("/work", function (req, res) {
  item = req.body.newItem
  workItems.push(item)
  res.redirect("/work")
})

app.get("/about", function(req,res) {
  res.render("about")
})

app.listen(3000, function () {
  console.log("server is running on port 3000")
})
