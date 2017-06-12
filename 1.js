// var QRCode = require('qrcode')
// QRCode.toFile('https://www.baidu.com/', {
//   color: {
//     dark: '#00F',  // Blue dots
//     light: '#0000' // Transparent background
//   }
// }, function (err) {
//   if (err) throw err
//   console.log('done')
// })

let path = require('path')
let a = path.resolve(process.cwd(), 'server/dbimg', '1.png')
console.log(a)