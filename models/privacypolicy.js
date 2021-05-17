const mongoose = require("mongoose");

const PrivacyPolicySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const PrivacyPolicy = mongoose.model("PrivacyPolicy", PrivacyPolicySchema);

module.exports = PrivacyPolicy;
