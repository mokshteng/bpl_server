const {createPrediction} = require('../models/predictions')

async function createPredictionInfo(req,res) {
    const {matchid,teamid,isdraw} = req.body
   const user_id = req.session.userid
    createPrediction({user_id,matchid,teamid,is_draw:isdraw}).then((data)=>{
        return res.status(200).json({ success: true, data:"Prediction created" });
    }).catch((err)=>{
        console.log(err)
        return res.status(401).json({ success: false, err:"Error" });
    })
    
 

} 
module.exports= {createPredictionInfo}