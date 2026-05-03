const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: String,
    code: String,
    analysis: String,
    improvedCode: String
});


module.exports = mongoose.model ('Snippet', snippetSchema);