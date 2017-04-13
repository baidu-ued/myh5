var route = require('express').Router();
var routes = ['./list.js'];
var arr = [];
routes.forEach(function(item) {
    arr.push(require(item)(route))
})
console.log(arr);
module.exports = arr;
