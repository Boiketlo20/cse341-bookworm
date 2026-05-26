const validator = require('../utilities/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        author: 'required|string',
        description: 'required|string',
        rating: 'required|string',
        genres: 'string',
        publication_date: 'string',
        image_url: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }else{
            next();
        }
    });
};

module.exports = {saveBook};