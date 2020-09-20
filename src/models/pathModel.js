const mongoose = require('mongoose');

const pathSchema = mongoose.Schema({
    tag: String,
    domain: String,
    path: String,
    method: String,
    property: mongoose.Schema.Types.Mixed,
    identifier: Number
});

module.exports = mongoose.model('path', pathSchema);