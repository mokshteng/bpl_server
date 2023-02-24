const knex = require("../library/db");

async function getTeamByID(teamid) {
    return knex("teams")
      .select("*")
      .where({ teamid })
      .then((rows) => {
          if(Array.isArray(rows) && rows.length > 0) {
            return rows[0]
          }
        
        return {error:"Team does not exist"}
      });
}
module.exports = {getTeamByID}