const knex = require("../library/db");

async function getResultByMatchID(matchid) {
    return knex("results")
      .select("*")
      .where({ matchid })
      .then((rows) => {
          if(Array.isArray(rows) && rows.length > 0) {
            return rows[0]
          }
        
        return {error:"Result does not exist"}
      });
}

async function createResult(result) {
    
  const { matchid } = result;

return await knex("results")
  .insert({
    matchid,
    teamid:result.teamid,
    is_draw:result.isdraw
  })

  .catch((err) => {
      console.log(err)
    return { error: "error" };
  });
}

module.exports = {getResultByMatchID, createResult}