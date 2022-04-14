const supertest = require("supertest");
const app = require('./app.js');
describe("/get-location-branches", () => {

    describe("header lbg-txn-branch-location  only pattern as '^[a-zA-Z]{3,30}$", () => {
        test("header lbg-txn-branch-location less than 3 character,  respond with a 400 status code", async () => {

            const response = await supertest(app).get("/get-location-branches").set('lbg-txn-branch-location', 'lo');
            expect(response.statusCode).toBe(400);
            expect(response.headers["content-type"]).toContain('json');
        }, 10000);

        test("header lbg-txn-branch-location >=3 characters or <=30,  respond with a 200 status code", async () => {
            const response = await supertest(app).get("/get-location-branches").set('lbg-txn-branch-location', 'london');
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toContain('json');
        }, 15000);
        test("header lbg-txn-branch-location  > 30,  respond with a 400 status code", async () => {
            const response = await supertest(app).get("/get-location-branches").set('lbg-txn-branch-location', 'londonlondonlondonlondonlondonn');
            expect(response.statusCode).toBe(400);
            expect(response.headers["content-type"]).toContain('json');
        }, 10000);
        test("header lbg-txn-branch-location string only as [a-zA-Z] pattern ,  respond with a 200 status code", async () => {
            const response = await supertest(app).get("/get-location-branches").set('lbg-txn-branch-location', 'kent');
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toContain('json');
        }, 10000);
        test("header lbg-txn-branch-location not as [a-zA-Z] pattern ,  respond with a 400 status code", async () => {
            const response = await supertest(app).get("/get-location-branches").set('lbg-txn-branch-location', 'kent1');
            expect(response.statusCode).toBe(400);
            expect(response.headers["content-type"]).toContain('json');
        }, 10000);

    });
    test("response with given header lbg-txn-branch-location,  respond with a 200 status code and should not have any other branches , not matching with  header lbg-txn-branch-location", async () => {
        const location = 'london';
        const response = await supertest(app).get("/get-location-branches").set('lbg-txn-branch-location', location);
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toContain('json');
        let filter=[];
        response.body.forEach(item => {
            let localFilter = [];
            localFilter = item.branches.filter(branch => {
                let status = true;
                if (!branch.PostalAddress.CountrySubDivision.includes(location.toUpperCase())) {
                    status = true;
                }
                else {
                    status = false;
                }
                return status;
            });
            filter = [...filter, ...localFilter];
        });
        expect(filter.length).toEqual(0);
        expect(response.headers["content-type"]).toContain('json');
    }, 10000);





});