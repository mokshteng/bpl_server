const { createResult } = require("../models/results")

const createResultInfo = async (req, res) => {
    createResult(req.body).then((data)=>{
        return res.status(200).json({success:true,data:"Result created"})
    }).catch((err)=>{
        console.log(err)
        return res.status(401).json({success:false,error:"Error"})

    })
}
module.exports = {createResultInfo}