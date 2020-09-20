const mongoose = require('mongoose');

const definitionSchema = mongoose.Schema({
    tag: String,
    domain: String,
    definition: String,
    property: mongoose.Schema.Types.Mixed,
    identifier: Number
});

module.exports = mongoose.model('definition', definitionSchema);