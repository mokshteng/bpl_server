const { getMatchDateByID } = require('../models/matches')
const {createPrediction} = require('../models/predictions')

async function createPredictionInfo(req,res) {
    const {matchid,teamid,isdraw} = req.body
    getMatchDateByID(matchid).then((pDate)=>{
        const current = new Date()
        if(current.getFullYear() === pDate.getFullYear() &&
        current.getMonth() === pDate.getMonth() &&
        current.getDate() === pDate.getDate() && Number(current.getHours())>=16&& Number(current.getMinutes())>=30) {
            return res.status(401).json({ success: false, err:"Prediction Time Over" });
        }
        if(pDate.getTime()<current.getTime()) {
            return res.status(401).json({ success: false, err:"Prediction Time Over" });

        }
        
        const user_id = req.session.userid
    createPrediction({user_id,matchid,teamid,is_draw:isdraw}).then((data)=>{
        return res.status(200).json({ success: true, data:"Prediction created" });
    }).catch((err)=>{
        console.log(err)
        return res.status(401).json({ success: false, err:"Error" });
    })

    })
   
    
 

} 
module.exports= {createPredictionInfo}