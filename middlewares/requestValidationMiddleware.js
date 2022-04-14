const Joi = require('joi');
const validateRequest = async (req, res, next) => {
    try {
        const locationheader = req.headers['lbg-txn-branch-location'];
        const schema = Joi.object({
            location: Joi.string().required().pattern(new RegExp('^[a-zA-Z]{3,30}$'))
        })
        const value = await schema.validateAsync({ location: locationheader });
        next();
    }
    catch (err) {
        res.status(400).json({ message: err.toString() });
    }
}
module.exports = validateRequest;
