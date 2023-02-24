const knex = require("../library/db");

async function getUserByID(userid) {
  return knex("users")
    .select("*")
    .where({ user_id: userid })
    .then((rows) => {
      const data =
        Array.isArray(rows) && rows.length > 0
          ? rows[0]
          : { error: "User does not exist" };
      if (data.error) {
        return data;
      }
      return data;
    });
}

async function getUserByEmail(email) {
    
    return knex("users")
    .select("*")
    .where({ email })
    .then(
      (rows) => {
        return Array.isArray(rows) &&
        (rows.length > 0 ? rows[0] : { error: "User does not exist" })
      }).catch((err)=>{
        console.log(err)
        return err
      });
}
async function getPasswordByEmail(email) {
  return knex("users")
    .select("password")
    .where({ email })
    .then(
      (rows) =>
        Array.isArray(rows) &&
        (rows.length > 0 ? rows[0] : { error: "User does not exist" })
    );
}
async function createUser(user) {
    
    const { user_id } = user;
  
  return await knex("users")
    .insert({
      user_id,
      email: user.useremail,
      name: user.name,
      password: user.password,
    })

    .catch((err) => {
        console.log(err)
      return { error: "error" };
    });
}

module.exports = {
  createUser,
  getUserByID,
  getUserByEmail,
  getPasswordByEmail,
};
