const jwt = require("jsonwebtoken");

const SECRET_KEY = "_V391X@RLZNe6&N8}5{ODz6{mPJfS{df}"

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = async( token) => {
  return jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return { err };
    return { userid: decoded.userid };
  });
};

module.exports = {
  createToken,
  verifyToken,
};
