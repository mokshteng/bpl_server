
const knex = require("../library/db");

async function createPrediction(prediction) {
    const {matchid,user_id,teamid,is_draw} = prediction
  console.log(prediction)
  return await knex("predictions")
    .insert({
      matchid,
      user_id,
      teamid,
      is_draw
    }).catch((err) => {
        console.log(err)
      return { error: "error" };
    });
  }

module.exports = {
    createPrediction
}  