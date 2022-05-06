const { getBranches, getfilteredResponse } = require("./services/getBranches");
describe("testing getBranches.js ", () => {
    describe("testing getBranches()", () => {
    });
    test("getBranches() returns array of details of bank branches  for  given header lbg-txn-branch-location, if branches are available for given header", async () => {
        const url = "https://api.lloydsbank.com/open-banking/v2.2/branches";
        const header = "london";
        let response = await getBranches(url, header);
        expect(response.length).toBeGreaterThanOrEqual(0);
    },10000);
});