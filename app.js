const express = require("express");
const app = express();
const validateRequest = require("./middlewares/requestValidationMiddleware.js");
const branchRouter = require('./routes/branchesRouter.js')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validateRequest);
// app.get("/",(req, res)=>{
//     res.send({message:"Welcome to llyodsbank"})
// });
app.use("/", branchRouter);
module.exports = app;

///app.js > branchesRouter > branchesController > getBranches > getFilteredResponse
///Single responsibility
///TODO create a sepperate router - branchesRouter.js -  routing, middleware

///var -global

///let - let animal ='monkey';
/// animal='lion';

///const - const animal = 'monkey';
/// animal='lion';  --error
///After splitting up code - create unit testes for new modules
