const { encryptPassword, checkPassword } = require("../helpers/crypto");
const { v4: uuidv4 } = require("uuid");
const { createToken } = require("../helpers/jwt.js");
const { isEmailValid } = require("../helpers/validations.js");
const { getPasswordByEmail, getUserByEmail, createUser } = require("../models/users");

const registration = async (req, res) => {
  try {
    console.log(req.body)
    const { useremail, name, password } = req.body;
    if (name === "" || password === "" || !isEmailValid(useremail)) {
      res
        .status(401)
        .json({ data: "", success: false, error: "Invalid User Details" });
    }
    getUserByEmail(useremail)
      .then(async (user) => {
        console.log(user);
        if (!user.error) {
          return res
            .status(401)
            .json({ data: "", success: false, error: "User already exists" });
         
        }
        const encryptedPassword = encryptPassword(password);
    
        createUser({
          user_id: uuidv4(),
          useremail:useremail,
          name:name,
          password: encryptedPassword,
        })
          .then((userData) => {
            console.log(userData)
            res.status(201).json({ success: true, data: "User Created" });
          })
          .catch((err) => {
            res.status(500).json({ success: false, data: "error" });
          });
      })
      .catch((err) => res.status(401).json({ success: false, data: "error" }));
  } catch (err) {
    res.send(401).json({ success: false, data: "error" });
  }
};

const login = async (req, res) => {
  const { useremail, password } = req.body;
  const user = await getUserByEmail(useremail);
  if (user.error) {
    res.status(404).json({ data: user.error });
    return;
  }

  const data = await getPasswordByEmail(useremail);
  const correctPassword = data.password
  const isLoggedIn = await checkPassword(password, correctPassword);
  console.log(correctPassword)
  console.log(password)
  if (!isLoggedIn) {
    res.status(403).json({ isLoggedIn });
    return;
  }
  const { user_id } = user;
  const token = createToken({ user_id });
  res.cookie("token", token);
  res.status(200).json({ isLoggedIn, token });
};

module.exports = {
  registration,
  login,
};
