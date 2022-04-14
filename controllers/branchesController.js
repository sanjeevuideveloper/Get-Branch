const {getBranches} =require('../services/getBranches.js');
const getLocationBranches= async (req, res)=>{
    try {  
        const locationheader = req.headers['lbg-txn-branch-location'];   
        const url = "https://api.lloydsbank.com/open-banking/v2.2/branches";   
        let response = await getBranches(url, locationheader);
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err.toString());
        res.status(500).json(err.toString());
    }

}
module.exports = {getLocationBranches};
