// Confucius
// =========


// Dependencies
// ------------

var _ = require('lodash');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');


// Declare Internals
var internals = {};


// Deep merge defaults.
//
// Taken from http://lodash.com/docs#partialRight
//
// options  - Object
// defaults - Object
//
// Returns the merged object.
internals.defaultsDeep = _.partialRight(_.merge, function deep(value, other) {
    return _.merge(value, other, deep);
});


internals.confucius = module.exports = function confucius(name, options) {
    if (_.isUndefined(name) || !_.isString(name)) {
        throw new Error('name must be a string');
    }

    // Set defaults
    options = _.defaults(options || {}, {
        env: 'dev',
        defaults: {},
        ext: 'yml',
        file: 'config',
        dir: process.cwd(),
        envs: process.envs
    });


    // Load the config file
    var fileName = [
        options.file,
        options.env,
        options.ext
    ].join('.');

    var filePath = path.join(options.dir, fileName);
    var fileContent = fs.readFileSync(filePath, 'utf8');
    var result = yaml.load(fileContent, {
        filename: filePath,
        strict: true
    });


    // Load env variables
    var envMatcher = new RegExp('^' + name + '_', 'i');
    var envs = {};

    // Lower case all envs
    _.forEach(options.envs, function (value, name) {
        if (!name.match(envMatcher)) {
            return;
        }

        var newName = name.replace(envMatcher, '').toLowerCase();
        envs[newName] = _.clone(value);
    });

    // Merge
    result = _.assign(result, envs);


    // Merge in defaults
    result = internals.defaultsDeep(result, options.defaults);

    return result;
};
