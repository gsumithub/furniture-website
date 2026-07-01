const Terms = require("../../model/termsModel");

// Admin: Add / update terms (only one record exists)
let addOrUpdateTerms = async (req, res) => {
    try {
        const { content } = req.body;
        const existing = await Terms.findOne();
        if (existing) {
            await Terms.updateOne({ _id: existing._id }, { $set: { content, updated_at: Date.now() } });
            return res.send({ _status: true, _message: "Terms updated successfully" });
        }
        const terms = await Terms.create({ content });
        res.send({ _status: true, _message: "Terms added successfully", terms });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

// Admin + Public: View terms
let viewTerms = async (req, res) => {
    try {
        const data = await Terms.findOne();
        res.send({ _status: true, _message: "Terms & Conditions", data });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

module.exports = { addOrUpdateTerms, viewTerms };
