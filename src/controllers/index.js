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

    } catch (e) {
        res.status(e.status || 400).send(generateResponse({

        }, false, e.message))
    }
}


module.exports = { root }