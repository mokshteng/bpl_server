const crypto = require("crypto")

const encryptPassword =  (password) => {
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  return passwordHash;
};

const checkPassword = async (incomingPassword, originalPassword) => {
  const passwordHash = crypto.createHash('sha256').update(incomingPassword).digest('hex');
  return passwordHash === originalPassword 
 
};

module.exports = {
  encryptPassword,
  checkPassword,
};
