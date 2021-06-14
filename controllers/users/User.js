const express = require("express");
const router = express.Router();
const UserService = require("../../services/users/User");
const CaseConverter = require("../../services/util/CaseConverter");

router.post("/", async (req, res) => {
  try {
    const cekEmail = await UserService.ValidateEmail(req.body.email);
    if (!cekEmail) {
      res.status(422).json({ message: "EMAIL ALREADY EXIST" });
      return;
    }
    const cekMobilePhone = await UserService.ValidatePhoneNumber(
      req.body.mobilePhoneNumber
    );
    if (!cekMobilePhone) {
      res.status(422).json({ message: "MOBILE PHONE ALREADY EXIST" });
      return;
    }
    const cekUsername = await UserService.ValidateUsername(req.body.username);
    if (!cekUsername) {
      res.status(422).json({ message: "USERNAME ALREADY EXIST" });
      return;
    }
    const response = await UserService.PostUserService({
      user_type: req.body.userType,
      email: req.body.email,
      mobile_phone_number: req.body.mobilePhoneNumber,
      password: req.body.password,
      username: req.body.username,
    });
    console.log(response);
    const camelResponse = CaseConverter.SnakeToCamel(response);
    res.status(200).json({ camelResponse });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const getall = await UserService.GetUserService({});
    if (getall) {
      res.status(200).json({ data: getall });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get(`/:user_id`, async (req, res) => {
  try {
    const getByIdUser = await UserService.GetByIdUserService(
      req.params.user_id
    );
    if (getByIdUser) {
      res.status(200).json({ data: getByIdUser });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete(`/:user_id`, async (req, res) => {
  try {
    const del = await UserService.DeleteById(req.params.user_id);
    if (del) {
      res.status(200).send("DELETE SUCCESS");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put(`/:user_id`, async (req, res) => {
  try {
    const data = {
      user_type: req.body.userType,
      email: req.body.email,
      mobile_phone_number: req.body.mobilePhoneNumber,
      password: req.body.password,
      username: req.body.username,
    };
    const upd = await UserService.PutById(req.params.user_id, data);
    if (upd) {
      res.status(200).json({ data: upd });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
