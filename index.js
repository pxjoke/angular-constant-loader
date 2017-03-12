module.exports = function (content) {
    let data = '';
    try {
        data = JSON.parse(content);
    } catch (e) {
        this.emitError(`${this.resourcePath} must be a valid JSON object`);
        return '';
    }

    let moduleName = this.query.moduleName || 'constants';
    let field = this.query.field;

    if (field) {
        if (!data[field]) {
            this.emitError(`${this.resourcePath} has no field '${field}'`);
            return '';
        }

        data = data[field];
    }

    let constantNames = Object.keys(data);

    if (!constantNames.length) {
        this.emitError(`${this.resourcePath} must be a valid json object`);
    }

    let output = `export default angular.module('${moduleName}', [])`;

    for (name of constantNames) {
        let value = JSON.stringify(data[name]);

        output += `.constant('${name}', ${value})`;
    }

    output += `.name;`;

    return output;
};