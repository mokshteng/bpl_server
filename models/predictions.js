const knex = require("../library/db");


async function getPredictionByUserIDAndMatchID(prediction) {
  const { matchid, userid } = prediction;
  console.log(prediction)
  return knex("predictions").select("*").where({matchid,user_id:userid}).then((rows)=>{
    if (Array.isArray(rows) && rows.length == 0) {
      return false
    }
    return rows[0]

  })

}



async function createPrediction(prediction) {
  const { matchid, teamid, is_draw, user_id } = prediction;
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
      } else if (Array.isArray(rows) && rows.length > 0) {
        return knex("predictions")
          .update({ teamid })
          .where({ matchid, user_id });
      }
    });
}

async function getPredictionByUserID(user_id) {
  return knex.raw("select TO_CHAR(matches.match_date, 'dd-mm-yyyy') as match_date,temp.teamname, case when temp.teamid is null and results.teamid is null then 'draw' when temp.teamid=results.teamid then 'won' else 'lost' end as result from (select teams.teamid, teams.teamname,pred.matchid from teams inner join predictions pred on teams.teamid = pred.teamid where pred.user_id=?) temp inner join results on temp.matchid = results.matchid inner join matches on results.matchid = matches.matchid",[user_id]).then((data)=>{
    console.log(data)
    return data.rows
  }).catch(err=>{
    console.log(err)
    return err
  })

}

module.exports = {
  createPrediction,
  getPredictionByUserID,getPredictionByUserIDAndMatchID
};
