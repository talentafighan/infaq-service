const User = require("../../models/users/User");

module.exports = {
  PostUserService(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = new User(payload);
        const response = await newUser.save();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  GetUserService() {
    return new Promise(async (resolve, reject) => {
      try {
        const getUser = await User.find({});
        resolve(getUser);
      } catch (error) {
        reject(error);
      }
    });
  },
  GetByIdUserService(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const getByIdUser = await User.findOne({ user_id });
        resolve(getByIdUser);
      } catch (err) {
        reject(err);
      }
    });
  },
  DeleteById(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteByUser = await User.findOneAndDelete({ user_id });
        resolve(deleteByUser);
      } catch (err) {
        reject(err);
      }
    });
  },
  PutById(user_id, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const putByIdUser = await User.findOneAndUpdate(
          { user_id },
          { $set: payload },
          { new: true }
        );
        resolve(putByIdUser);
      } catch (err) {
        reject(err);
      }
    });
  },
  async ValidateEmail(payload) {
    const chekingEmail = await User.findOne({ email: payload });
    console.log(chekingEmail);
    if (chekingEmail) {
      return false;
    } else {
      return true;
    }
  },
  async ValidatePhoneNumber(payload) {
    const checkingPhoneNumber = await User.findOne({
      mobile_phone_number: payload,
    });
    if (checkingPhoneNumber) {
      return false;
    } else {
      return true;
    }
  },
  async ValidateUsername(payload) {
    const checkingUsername = await User.findOne({
      username: payload,
    });
    if (checkingUsername) {
      return false;
    } else {
      return true;
    }
  },
};
