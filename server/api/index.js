var route = require('express').Router();
var routes = ['./list.js', './edit.js'];
var arr = [];
routes.forEach(function(item) {
    arr.push(require(item)(route))
})
module.exports = arr;
