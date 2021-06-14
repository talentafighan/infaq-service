const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  user_id: {
    type: schema.ObjectId,
    auto: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_phone_number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
