const knex = require("../library/db");

async function getResultByMatchID(matchid) {
  return knex("results")
    .select("*")
    .where({ matchid })
    .then((rows) => {
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
      }

      return { error: "Result not yet declared" };
    });
}

async function createResult(result) {
  const { matchid } = result;

  return await knex("results")
    .insert({
      matchid,
      teamid: result.teamid,
      is_draw: result.isdraw,
    })

    .catch((err) => {
      console.log(err);
      return { error: "error" };
    });
}

const getScore = async () => {
  return knex
    .raw(
      "Select users.name,count(users.*)*10 as score from users inner join (select pred.* from predictions pred inner join results res on pred.teamid = res.teamid and res.matchid = pred.matchid where pred.teamid is not null) temp on temp.user_id = users.user_id group by users.user_id order by score desc"
    )
    .then((result) => {
      const rows = result.rows
      if (Array.isArray(rows) && rows.length > 0) {
        return rows;
      }
      return { data:"Empty Leaderboard!" };
    });
};

module.exports = { getResultByMatchID, createResult, getScore };
