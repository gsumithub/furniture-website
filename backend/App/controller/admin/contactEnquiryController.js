const ContactEnquiry = require("../../model/contactEnquiryModel");

// Submit from website contact form
let submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const enquiry = await ContactEnquiry.create({ name, email, phone, subject, message });
        res.send({ _status: true, _message: "Enquiry submitted successfully", enquiry });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

// Admin: View all enquiries
let viewEnquiries = async (req, res) => {
    try {
        const data = await ContactEnquiry.find({ deleted_at: null }).sort({ created_at: -1 });
        res.send({ _status: true, _message: "Contact Enquiries", data });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

// Admin: Delete enquiries
let deleteEnquiries = async (req, res) => {
    try {
        const { ids } = req.body;
        await ContactEnquiry.updateMany({ _id: ids }, { $set: { deleted_at: Date.now() } });
        res.send({ _status: true, _message: "Enquiries deleted" });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

// Admin: Change status
let changeStatus = async (req, res) => {
    try {
        const { ids } = req.body;
        await ContactEnquiry.updateMany({ _id: ids }, [{ $set: { status: { $not: '$status' } } }], { updatePipeline: true });
        res.send({ _status: true, _message: "Status changed" });
    } catch (err) {
        res.status(500).send({ _status: false, _message: err.message });
    }
};

module.exports = { submitEnquiry, viewEnquiries, deleteEnquiries, changeStatus };
