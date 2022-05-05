const { getBranches, getfilteredResponse } = require("./services/getBranches");
describe("testing getBranches.js ", () => {
    describe("testing getBranches()", () => {
    });
    test("getBranches() returns array of details of bank branches  for  given header lbg-txn-branch-location, if branches are available for given header", async () => {
        const url = "https://api.lloydsbank.com/open-banking/v2.2/branches";
        const header = "london";
        let response = await getBranches(url, header);
        expect(response.length).toBeGreaterThanOrEqual(0);
    });
    // test("getBranches() returns error  when called with missing url", async () => {
    //     const url = "https://api.lloydsbank.com/open-banking/v2.2/branches";
    //     const header = "london";
    //     expect.assertions(1);
    //     try {
    //         await getBranches('',header);
    //     } catch (e) {
    //         console.log(e.toString());
    //       expect(e).toBeInstanceOf(Error);
    //     }
    // }, 10000);
   
});