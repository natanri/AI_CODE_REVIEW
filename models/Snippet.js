const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: String,
    code: String,
    analysis: String,
    improvedCode: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }    
});

module.exports = mongoose.model("Snippet", snippetSchema);