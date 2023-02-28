const { getMatchDateByID } = require("../models/matches");
const {
  createPrediction,
  getPredictionByUserID,
  getPredictionByUserIDAndMatchID,
} = require("../models/predictions");
const {
  isPreviousDay,
  isTodayAndDone,
  isToday,
  isOngoing,
} = require("../helpers/date");


async function getPredictionByUserAndMatch(req, res) {
  const { userid } = req.session;
  const { matchid } = req.query;
  getPredictionByUserIDAndMatchID({userid,matchid}).then(data=>{
    return res.status(200).json({ success: true, data });

  }).catch((err) => {
    console.log(err)
    return res.status(401).json({ success: false, error: "Error" })
  });



}



async function getPredictionByUser(req, res) {
  const { userid } = req.session;
  getPredictionByUserID(userid)
    .then((data) => {
      return res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      console.log(err)
      return res.status(401).json({ success: false, error: "Error" })
    });
}

async function createPredictionInfo(req, res) {
  const { matchid, teamid, isdraw } = req.body;
  getMatchDateByID(matchid).then((matchdate) => {
    if (
      isPreviousDay(matchdate) ||
      (isToday(matchdate) && isOngoing()) ||
      isTodayAndDone(matchdate)
    ) {
      return res
        .status(401)
        .json({ success: false, error: "Prediction time over" });
    }
    const user_id = req.session.userid;
    createPrediction({ user_id, matchid, teamid, is_draw: isdraw })
      .then((data) => {
        return res
          .status(200)
          .json({ success: true, data: "Prediction created" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ success: false, err: "Error" });
      });
  });
}
module.exports = { createPredictionInfo,getPredictionByUser,getPredictionByUserAndMatch };
