/* Eğer birden fazla function olacaksa bu şekilde yapmalıyız ama tek bir function olacaksa module.export = getDate; yeterli */

/* module.export.getDate = getDate; veya module.exports.getDay = getDay; sayesinde getDate ve getDay function'ına dışarıdan " const date = require(__dirname + "/date.js") " erişim sağlayabiliyoruz(buradaki getDate'i getDate() şeklinde
yazmamamızın sebebi eğer getDate() şeklinde yazarsak fonksiyonu buradan çağıracağır) */ 

// kısa hali
exports.getDate = function() {

    const today = new Date()

    // Javascript object
    const options = {
      weekday: "long", // gün ismi uzun haliyle yazılır 4.gün to Thursday
      day: "numeric", // ayın kaçıncı günü olduğunu ismiyle değil sayıyla yazar
      month: "long", // ayı sayıyla değil ismiyle uazar
    }
    
    return today.toLocaleDateString("tr-TR", options)

}

exports.getDay = function() {

    const today = new Date()

    // Javascript object
    const options = {
      weekday: "long", // gün ismi uzun haliyle yazılır 4.gün to Thursday
    }
    
    return today.toLocaleDateString("tr-TR", options)

}

// uzun hali
/* module.exports.getDate = getDate;

function getDate() {

    let today = new Date()

    // Javascript object
    let options = {
      weekday: "long", // gün ismi uzun haliyle yazılır 4.gün to Thursday
      day: "numeric", // ayın kaçıncı günü olduğunu ismiyle değil sayıyla yazar
      month: "long", // ayı sayıyla değil ismiyle uazar
    }
    
    let day = today.toLocaleDateString("tr-TR", options)

    return day;
} */