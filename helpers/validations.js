const isValidUUIDV4 = require("is-valid-uuid-v4").isValidUUIDV4;

const isEmailValid = (email) => {
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return regex.test(email);
};

const isuuidValid = (id) => {
  return isValidUUIDV4(id);
};

module.exports = {
  isEmailValid,
  isuuidValid,
};
