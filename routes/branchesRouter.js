const express = require('express')
const router = express.Router();
const branchesController = require("../controllers/branchesController.js");
router.get('/get-location-branches', branchesController.getLocationBranches);

module.exports=router;