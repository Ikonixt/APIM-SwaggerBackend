const mongoose = require('mongoose');

const securitySchema = mongoose.Schema({
    tag: String,
    domain: String,
    auth: String,
    property: mongoose.Schema.Types.Mixed,
    identifier: Number
});

module.exports = mongoose.model('security', securitySchema);