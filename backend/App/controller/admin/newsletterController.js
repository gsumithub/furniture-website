const Newsletter = require("../../model/newsletterModel");

// Subscribe from website
let subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.send({ _status: false, _message: "Email is required" });

        // Check if already subscribed
        const existing = await Newsletter.findOne({ email, deleted_at: null });
        if (existing) return res.send({ _status: false, _message: "Already subscribed!" });

        const entry = await Newsletter.create({ email });
        res.send({ _status: true, _message: "Subscribed successfully!", entry });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

// Admin: View all subscribers
let viewSubscribers = async (req, res) => {
    try {
        const data = await Newsletter.find({ deleted_at: null }).sort({ created_at: -1 });
        res.send({ _status: true, _message: "Newsletter Subscribers", data });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

// Admin: Delete subscribers
let deleteSubscribers = async (req, res) => {
    try {
        const { ids } = req.body;
        await Newsletter.updateMany({ _id: ids }, { $set: { deleted_at: Date.now() } });
        res.send({ _status: true, _message: "Subscribers deleted" });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

module.exports = { subscribe, viewSubscribers, deleteSubscribers };
