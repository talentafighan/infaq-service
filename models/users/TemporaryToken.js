const mongoose = require("mongoose");
const schema = mongoose.Schema;

const TemporaryTokenSchema = new schema({
  user_id: {
    type: "String",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expired_date: {
    type: Date,
    required: true,
  },
});

module.exports = TemporaryToken = mongoose.model(
  "temporary_token",
  TemporaryTokenSchema
);
