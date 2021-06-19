const User = require("../../models/users/User");
const nodemailer = require("nodemailer");

module.exports = {
  PostUserService(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const newUser = new User(payload);

        var transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: newUser.email,
            pass: newUser.password,
          },
        });
        var mailOptions = {
          from: '"Infaq-Service 👻"',
          to: newUser.email,
          subject: "Infaq Service ✔",
          text: "your account has been registered in Infaq",
          // html: "<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>",
          // amp: `<!doctype html>
          // <html ⚡4email>
          //   <head>
          //     <meta charset="utf-8">
          //     <style amp4email-boilerplate>body{visibility:hidden}</style>
          //     <script async src="https://cdn.ampproject.org/v0.js"></script>
          //     <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          //   </head>
          //   <body>
          //     <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          //     <p>GIF (requires "amp-anim" script in header):<br/>
          //       <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          //   </body>
          // </html>`,
        };
        await transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("email send success!", info.response);
            const response = newUser.save();
            resolve(response);
          }
        });
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
  Login(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const Login = await User.findOne(payload);
        resolve(Login);
      } catch (error) {
        reject(error);
      }
    });
  },
};
