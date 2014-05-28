// Dependencies

var lab = require('lab');

var confucius = require('../');

// Test shortcuts

var expect = lab.expect;
var describe = lab.experiment;
var it = lab.test;


describe('confucius', function () {
    it('loads the configuration from the configFile', function (done) {

        var result = confucius('test', {
            dir: './test/fixtures'
        });

        expect(result.map['Block style']).to.eql({
            Clark: 'Evans',
            Ingy: 'dtttttt Net',
            Oren: 'Ben-Kiki'
        });

        done();
    });

    it('adds configuration from env variables', function (done) {

        var result = confucius('test', {
            dir: './test/fixtures',
            envs: {
                'TEST_AWESOME': 'awesome',
                'STUFF': 'stuff'
            }
        });

        expect(result.map['Block style']).to.eql({
            Clark: 'Evans',
            Ingy: 'dtttttt Net',
            Oren: 'Ben-Kiki'
        });

        expect(result.awesome).to.equal('awesome');
        expect(result.stuff).to.not.exist;

        done();
    });

    it('uses defaults', function (done) {

        var result = confucius('test', {
            dir: './test/fixtures',
            defaults: {
                map: {
                    'Block style': {
                        Clark: 'clark',
                        Hello: 'World'
                    }
                }
            }
        });

        expect(result.map['Block style']).to.eql({
            Clark: 'Evans',
            Ingy: 'dtttttt Net',
            Oren: 'Ben-Kiki',
            Hello: 'World'
        });

        done();
    });

    it('throws when not passing in a string', function (done) {

        expect(function () {
            confucius();
        }).to.throw;

        expect(function () {
            confucius({});
        }).to.throw;

        done()
    });

    it('uses the defaults when passing only the name', function (done) {
        expect(function () {
            confucius('hello');
        }).to.throw;
        done();
    });
});
