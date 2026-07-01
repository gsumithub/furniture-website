const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema({
    email: { type: String, required: [true, "Email is required"], unique: true },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});

module.exports = mongoose.model("newsletter", newsletterSchema);
