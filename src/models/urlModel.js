const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    protocol: String,
    domain: String,
    path: String,
    visable: Boolean,
    tag: String,
    identifier: Number
});

module.exports = mongoose.model('url', urlSchema);