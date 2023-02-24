const { verifyToken } = require("../helper/jwt");

const verifyJWTToken = async (req, res, next) => {
  if (!req.cookies) {
    return res.status(403).json({ message: "Please Login" });
  }
  const token = req.cookies.token;
  const data = await verifyToken(token);
  if (data.err) {
    return res.status(403).json({ data: "User token invalid" });
  }
  const { userid } = data;
  const payload = { userid };
  req.session = payload;
  next();
};

module.exports = { verifyJWTToken };
