const { validate, getProperty } = require('../validate')

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

        let { field, condition, condition_value } = rule
        let field_value = getProperty(field, data)

        const success = validate(field_value, condition, condition_value)

        if (success) {
            res.send(generateResponse({
                validation: {
                    error: false,
                    field,
                    field_value,
                    condition,
                    condition_value
                }
            }, true, `field ${field} successfully validated.`))
        } else {
            return await Promise.reject({
                data: {
                    validation: {
                        error: false,
                        field,
                        field_value,
                        condition,
                        condition_value
                    }
                },
                message: `field ${field} failed validation.`
            })
        }
    } catch (e) {
        res.status(e.status || 400).json(generateResponse(e.data || null, false, e.message))
    }
}

function syntaxErrorHandler(err, req, res, next) {
    if (err && err instanceof SyntaxError && err.type === 'entity.parse.failed' && req.method === 'POST') {
        return res.status(err.status || 400).json(generateResponse(null, false, 'Invalid JSON payload passed.'))
    }

    next()
}

module.exports = { root, validator, syntaxErrorHandler }