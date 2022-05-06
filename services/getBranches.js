const axios = require('axios');
const getBranches =async (url, locationheader)=>{
    const response = await axios.get(url);
    const result = await getfilteredResponse(response.data.data[0].Brand, locationheader);
    return result;
}
const getfilteredResponse = async (result, location)=> {
    let branches = [];
    result.forEach((bank) => {
        let branchresult = [];
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
module.exports={getBranches};
