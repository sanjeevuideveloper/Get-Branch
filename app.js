const express = require("express");
const app = express();
const Joi = require('joi');
const axios = require('axios');
app.use(express.json());
///app.js > branchesRouter > branchesController > getBranches > getFilteredResponse
///Single responsibility
///TODO create a sepperate router - branchesRouter.js -  routing, middleware

///var -global

///let - let animal ='monkey';
/// animal='lion';

///const - const animal = 'monkey';
/// animal='lion';  --error
///After splitting up code - create unit testes for new modules
app.get("/getBranches", async (req, res) => {
    const locationheader = req.headers['lbg-txn-branch-location'];
    try {
        ///TODO move to requestValidationMiddleware.js
        const schema = Joi.object({
            location: Joi.string().required().pattern(new RegExp('^[a-zA-Z]{3,30}$'))
        })
        const value = await schema.validateAsync({ location:locationheader });


        var response = await axios.get('https://api.lloydsbank.com/open-banking/v2.2/branches');
        var result = filterResponse(response.data.data[0].Brand, locationheader);
        res.status(200).json(result);
    }
    catch (err) {
        if (Joi.isError(err)) {
            res.status(400).json(err.toString());
        }
        else {
            res.status(500).json(err.toString());
        }

    }

})
// filterResponse = (result1, location) => {

//}
function filterResponse(result1, location) {
    let branches = [];
    result1.forEach((bank) => {
        var branchresult = [];
        branchresult = bank.Branch.filter(branchdetail => {
            if (branchdetail.PostalAddress && branchdetail.PostalAddress.CountrySubDivision) {
                return branchdetail.PostalAddress.CountrySubDivision.includes(location.toUpperCase());
            }

        })
        if (branchresult) {
            branches.push({ brandName: bank.BrandName, branches: branchresult })
        }
    })
    return branches;
}
module.exports = app;
