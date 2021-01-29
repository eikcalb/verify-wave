function validate(field, operator, query) {

}

function getProperty(property, reference) {
    if (typeof property === 'string') {
        property = property.split('.')
        if (property.length > 3) {
            throw new Error('Field nesting should not be more than 2 levels')
        }
        return property.reduce((root, current) => {
            if (root && root.hasOwnProperty(current)) {
                let reference = root[current]
                return reference
            } else {
                throw new Error('Field does not exist')
            }
        }, reference)
    } else {
        throw new Error('Invalid property key specified')
    }
}

module.exports = { validate,getProperty }