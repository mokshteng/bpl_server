const { getMatchInfoByDate } = require("../models/matches")

const getMatchInfo = async (req, res) => {
    const  {matchdate}  = req.query
    const currentDate=new Date()
    const currentHour=Number(currentDate.getHours())
    const currentMinute = Number(currentDate.getMinutes())
    const matchDate=new Date(matchdate)
    let dateState=1
    if(matchDate.getDate()==currentDate.getDate()&&(currentHour==16&&currentMinute>=30)||currentHour>17&&currentHour<20) {
        dateState=2
    }
    else if(matchDate<currentDate) {
        dateState=3
    }
    
    console.log(matchdate)
    getMatchInfoByDate(matchdate).then((data,date_state)=>{
        return res.status(200).json({success:true,data})
    }).catch((err)=>{
        console.log(err)
        return res.status(401).json({success:false,error:"Error"})

    })
}
module.exports = {getMatchInfo}