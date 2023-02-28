const { getMatchInfoByDate } = require("../models/matches");
const { isToday,
    isPreviousDay,
    isOngoing, 
    isTodayAndDone,
    isUpcomingDay} = require("./../helpers/date")

const getMatchInfo = async (req, res) => {
  const { matchdate } = req.query;
  const matchDate = new Date(matchdate)
  let dateState = 1;
  if((isToday(matchDate)&&isOngoing())) {
    dateState = 2 
  }
  else if(isPreviousDay(matchDate)||isTodayAndDone(matchDate)) {
    dateState = 3
  } 
  getMatchInfoByDate(matchdate, dateState)
    .then((data) => {
        if(data.error) {
            return res.status(200).json({ success: true, data:data.error });

        }
      return res.status(200).json({ success: true, data:data });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ success: false, error: "Error" });
    });
};
module.exports = { getMatchInfo };
