const mongoose = require("mongoose");
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user");

///////////////////////////////LOGIN/////////////////////
exports.login = async (req, res, next) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    return res?.status(400).json({ error: "Email and password are required!" });
  }
  User?.find({ email: email })
    .exec()
    .then((user) => {
      if (user?.length < 1) {
        return res?.status(401)?.json({ error: "User not found" });
      }
      bcrypt?.compare(password, user[0]?.password, (err, result) => {
        if (!result) {
          return res?.status(401).json({ error: "Incorrect password" });
        }
        if (result) {
          const token = jsonWebToken?.sign(
            {
              _id: user[0]?._id,
              name: user[0]?.name,
              email: user[0]?.email,
              phone: user[0]?.phone,
              role: user[0]?.role,
              created_at: user[0]?.created_at,
            },
            "secretKeyy",
            {
              expiresIn: "24h",
            }
          );
          res?.status(200)?.json({
            _id: user[0]?._id,
            name: user[0]?.name,
            email: user[0]?.email,
            phone: user[0]?.phone,
            role: user[0]?.role,
            created_at: user[0]?.created_at,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res?.status(500);
      res?.json({ error: err });
    });
};

/////////////////////////REGISTER///////////////////////////
exports.signUp = async (req, res, next) => {
  const { name, email, phone, password, role } = req?.body;
  if (!name || !email || !phone || !password) {
    return res?.status(400).json({ error: "Please enter all fields" });
  }
  User?.find({ email: email }).then((result) => {
    if (result?.length > 0) {
      return res
        ?.status(400)
        .json({ error: "User with this email already exists" });
    } else {
      bcrypt?.hash(req?.body?.password, 10, (err, hash) => {
        if (err) {
          return res?.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req?.body?.name,
            email: req?.body?.email,
            phone: req?.body?.phone,
            role: "User",
            password: hash,
            created_at: new Date(),
          });
          user
            ?.save()
            .then((result) => {
              res?.status(201);
              res?.json({ message: "User created", result: result });
            })
            .catch((err) => {
              res?.status(500);
              res?.json({ error: err });
            });
        }
      });
    }
  });
};

////////////////////////////DELETE USER/////////////////////
exports.deleteUser = async (req, res, next) => {
  const userId = req?.params?.id;
  User?.deleteOne({ _id: userId })
    .then((result) => {
      if (result?.deletedCount > 0) {
        return res
          ?.status(200)
          ?.json({ result: "success", message: "Removed User." });
      } else {
        return res
          ?.status(400)
          ?.json({ result: "failure", message: "No User Found" });
      }
    })
    .catch((err) => {
      res?.status(500);
      res?.json({ error: err });
    });
};

////////////////////////////UPDATE USER/////////////////////
exports.updateUser = async (req, res, next) => {
  const userId = req?.params?.id;
  const updateOps = {
    name: req?.body?.name,
    email: req?.body?.email,
    phone: req?.body?.phone,
    role: req?.body?.role,
    created_at: new Date(),
  };
  User?.updateOne({ _id: userId }, { $set: updateOps })
    .then((result) => {
      res?.status(200);
      res?.json({ message: "User updated", result: result });
    })
    .catch((err) => {
      res?.status(500);
      res?.json({ error: err });
    });
};

///////////////////////////GET ALL USERS///////////////////
exports.getAllUsers = async (req, res, next) => {
  User?.find()
    .then((result) => {
      res?.status(200)?.json({ count: result?.length, result: result });
    })
    .catch((err) => {
      res?.status(500)?.json({ error: err });
    });
};
