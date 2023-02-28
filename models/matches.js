const knex = require("../library/db");
const { getResultByMatchID } = require("./results");
const { getTeamByID } = require("./teams");

async function getMatchDateByID(matchid) {
  return knex("matches")
    .select("*")
    .where({ matchid })
    .then((rows) => {
      if (Array.isArray(rows) && rows.length > 0) {
        const match_data = rows[0];
        return match_data.match_date;
      }
    });
}

async function getMatchInfoByDate(match_date, date_state) {
  console.log(match_date, date_state);
  return knex("matches")
    .select("*")
    .where({ match_date })
    .then((rows) => {
      if (Array.isArray(rows) && rows.length == 0) {
        return { error: "No matches this day" };
      } else if (Array.isArray(rows) && rows.length > 0) {
        const match_data = rows[0];
        return getTeamByID(match_data.teamid1).then((team1_data) => {
          return getTeamByID(match_data.teamid2).then((team2_data) => {
            if (date_state == 1) {
              return {
                team1ID: team1_data.teamid,
                team2ID: team2_data.teamid,
                team1Name: team1_data.teamname,
                team2Name: team2_data.teamname,
                isdraw: false,
                match_date,
                matchid: match_data.matchid,
                matchresult: "Upcoming Match",
                isUpcoming: true,
                isOngoing:false
              };
            } else if (date_state == 2) {
              return {
                team1ID: team1_data.teamid,
                team2ID: team2_data.teamid,
                team1Name: team1_data.teamname,
                team2Name: team2_data.teamname,
                isdraw: false,
                match_date,
                matchid: match_data.matchid,
                matchresult: "Ongoing Match",
                isUpcoming: false,
                isOngoing:true
              };
            }
            return getResultByMatchID(match_data.matchid).then(
              (result_data) => {
                console.log(result_data);
                if (result_data.error) {
                  return {
                    team1ID: team1_data.teamid,
                    team2ID: team2_data.teamid,
                    team1Name: team1_data.teamname,
                    team2Name: team2_data.teamname,
                    match_date,
                    matchid: match_data.matchid,
                    matchresult: result_data.error,
                    isUpcoming: false,
                    isOngoing:false
                  };
                }
                let winnerTeam = null;
                if (!result_data.isdraw) {
                  if (result_data.teamid == team1_data.teamid) {
                    winnerTeam = team1_data.teamname;
                  } else {
                    winnerTeam = team2_data.teamname;
                  }
                }
                return {
                  team1ID: team1_data.teamid,
                  team2ID: team2_data.teamid,
                  team1Name: team1_data.teamname,
                  team2Name: team2_data.teamname,
                  isdraw: result_data.isdraw,
                  winnerTeam,
                  match_date,
                  matchid: match_data.matchid,
                  matchresult: `${winnerTeam} won the match`,
                  isUpcoming: false,
                  isOngoing:false
                };
              }
            );
          });
        });
      }

      return { data: "Upcoming match" };
    });
}
module.exports = { getMatchInfoByDate, getMatchDateByID };
