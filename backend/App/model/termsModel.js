const mongoose = require('mongoose');

const termsSchema = mongoose.Schema({
    content: { type: String, required: [true, "Content is required"] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("terms", termsSchema);
