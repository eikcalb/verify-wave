function validate(field, operator, query) {
    // Validation is set to fail, unless it succeeds
    let response = false
    switch (operator) {
        case 'eq':
            response = field == query
            break
        case 'neq':
            response = field != query
            break
        case 'gt':
            response = field > query
            break
        case 'gte':
            response = field >= query
            break
        case 'contains':
            response = `${field}`.includes(query)
            break
        default:
            throw new Error('Condition operator not supported')
    }

    return response
}

/**
 * Accepts a string path to a required `property` in the `reference`.
 * Throws error if `property` is not a string or if the property does not exist on `reference`.
 * 
 * @param {string} path 
 * @param {object} reference 
 */
function getProperty(property, reference) {
    if (typeof property === 'string') {
        let path = property.split('.')
        if (path.length > 3) {
            throw new Error('Field nesting should not be more than 2 levels.')
        }
        // Use reduce to go through the object properties.
        // An alternative solution would be too use a for loop
        return path.reduce((root, current) => {
            if (root && root.hasOwnProperty(current)) {
                let reference = root[current]
                return reference
            } else {
                throw new Error(`${property} is required.`)
            }
        }, reference)
    } else {
        throw new Error('Invalid property key specified.')
    }
}

module.exports = { validate, getProperty }