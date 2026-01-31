const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: 'Maximum 3 requests per minute is allowed.'
});