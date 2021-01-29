const { validate } = require('../validate')

/**
 * Helper method to generate a properly formatted response
 * 
 * @param {*} data 
 * @param {*} isSuccess 
 * @param {*} message 
 */
function generateResponse(data, isSuccess = true, message = 'API response') {
    return {
        message,
        status: isSuccess ? 'success' : 'error',
        data
    }
}

/**
 * Root route that returns developer's information
 * 
 * @route `GET /`
 * 
 * @param {*} req 
 * @param {*} res 
 */
function root(req, res) {
    return res.send(generateResponse({
        name: 'Onome Israel Agwa',
        github: '@eikcalb',
        email: 'agwaisraelonome@gmail.com',
        mobile: '08083821782',
        twitter: '@iamagwa'
    }))
}


/**
 * Route to handle validation requests
 * 
 * @route `POST /validate-rule`
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function validator(req, res) {
    try {
        const { rule, data } = req.body
        if (!rule) {
            throw new Error('rule is required.')
        } else if (!data) {
            throw new Error('data is required.')
        } else if (typeof rule !== 'object') {
            throw new Error('rule should be an object.')
        } else if (!['object', 'string'].includes(typeof data)) {
            // This checks if the data field is not object, array or string
            throw new Error('data should be an array, object or string.')
        }
    } catch (e) {
        res.status(e.status || 400).send(generateResponse(null, false, e.message))
    }
}

async function syntaxErrorHandler(err, req, res, next) {
    if (err && typeof err === SyntaxError) {
        res.status(err.status || 400).send(generateResponse(null, false, 'Invalid JSON payload passed.'))
    }
}

module.exports = { root, syntaxErrorHandler }