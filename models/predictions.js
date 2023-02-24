const knex = require("../library/db");

async function createPrediction(prediction) {
    const { matchid, user_id, teamid, is_draw } = prediction;
  return knex("predictions")
    .select("*")
    .where({ matchid, user_id })
    .then(async (rows) => {
      if (Array.isArray(rows) && rows.length == 0) {
        await knex("predictions")
          .insert({
            matchid,
            user_id,
            teamid,
            is_draw,
          })
          .catch((err) => {
            console.log(err);
            return { error: "error" };
          });
      }
      else if(Array.isArray(rows) && rows.length > 0) {
        return knex("predictions").update({teamid}).where({ matchid, user_id })
      }
    });


}

module.exports = {
  createPrediction,
};
