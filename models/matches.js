const knex = require("../library/db");
const { getResultByMatchID } = require("./results");
const { getTeamByID } = require("./teams");




async function getMatchInfoByDate(match_date,date_state) {
    console.log(match_date)
    return knex("matches")
      .select("*")
      .where({ match_date })
      .then((rows) => {
          if(Array.isArray(rows) && rows.length > 0) {
           const match_data=rows[0]
            return getTeamByID(match_data.teamid1).then((team1_data)=>{
                return getTeamByID(match_data.teamid2).then((team2_data)=>{
                    if(date_state==1) {
                        return {team1ID:team1_data.teamid,team2ID:team2_data.teamid,team1Name:team1_data.teamname,
                            team2Name:team2_data.teamname,isdraw:false, match_date,matchid:match_data.matchid,
                            matchresult:"Upcoming Match"
                        }

                    }
                    else if(date_state==2) {
                        return {team1ID:team1_data.teamid,team2ID:team2_data.teamid,team1Name:team1_data.teamname,
                            team2Name:team2_data.teamname,isdraw:false, match_date,matchid:match_data.matchid,
                            matchresult:"Ongoing Match"
                        }

                    }
                    return getResultByMatchID(match_data.matchid).then((result_data)=>{
                        let winnerTeam=null
                        if(!result_data.isdraw) {
                            if(result_data.teamid==team1_data.teamid) {
                                winnerTeam=team1_data.teamname
                            }
                            else {
                                winnerTeam=team2_data.teamname

                            }
                        }
                        return {team1ID:team1_data.teamid,team2ID:team2_data.teamid,team1Name:team1_data.teamname,
                            team2Name:team2_data.teamname,isdraw:result_data.isdraw,winnerTeam, match_date,matchid:match_data.matchid,
                             matchresult:`${winnerTeam} won the match`
                        }

                    })


                })  
            })

          }
        
        return {data:"Upcoming match"}
      });
  }
  module.exports = {getMatchInfoByDate}