let mongoose = require('mongoose');
let models = require("./model.js");
let app = require("../app.js");
let Schemas= {};
for (let key in models) {
    Schemas[key] = new mongoose.Schema(models[key]);
}

module.exports = {
    getModel: function(item) {
        return app.db.model(item, Schemas[item])
    }
}
