const mongoose = require("mongoose");

const TermsOfServiceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const TermsOfService = mongoose.model("TermsOfService", TermsOfServiceSchema);

module.exports = TermsOfService;
