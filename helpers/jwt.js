const jwt = require("jsonwebtoken");

const SECRET_KEY = "_V391X@RLZNe6&N8}5{ODz6{mPJfS{df}"

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY,{ expiresIn: '1d' });
};

const verifyToken = async( token) => {
  console.log(token)
  return jwt.verify(token, SECRET_KEY, (err, decoded) => {
    
    if (err) {console.log(err) 
      return { err };}
      console.log(decoded)
  
    return { userid: decoded.user_id };
  });
};

module.exports = {
  createToken,
  verifyToken,
};
