const { verifyToken } = require("../helpers/jwt");

const verifyJWTToken = async (req, res, next) => {
  const { authorization } = req.headers;
   
  if (!authorization || !authorization.includes("Bearer ")) {
    return res.status(400).json({ err: "Invalid" });
  }
  console.log(authorization)
  const token = authorization.split(" ")[1];
  console.log(token)

  const data = await verifyToken(token);
  console.log(data)
  if (data.err) {
    return res.status(403).json({ data: "User token invalid" });
  }
  if (req.path === "/isauth") {
    return res.status(200).json({ loggedIn: true });
    
  }
  const { userid } = data;
  const payload = { userid };
  req.session = payload;
  next();
};

module.exports = { verifyJWTToken };
