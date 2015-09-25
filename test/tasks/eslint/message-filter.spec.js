'use strict';

var filter = require('../../../tasks/eslint/message-filter');

var expect = require('chai').expect;

describe('eslint message filter', function () {

    /*

    valid result object from ESLint 1.3.x:

    {
        filePath: '/path/to/a/file.js',
        messages: [
          {
            ruleId: 'no-console',
            severity: 2,
            message: 'Unexpected console statement.',
            line: 19,
            column: 16,
            nodeType: 'MemberExpression',
            source: '               console.log(\'message\', message);'
          }
        ],
        errorCount: 0,
        warningCount: 0
    }
    */

    it('should always return a valid result object', function() {
        var result = {
            filePath: '/path/to/a/file.js',
            messages: []
        };
        var resultClone = JSON.parse(JSON.stringify(result));

        var filtered = filter(result);

        expect(filtered).to.have.property('filePath', resultClone.filePath);
        expect(filtered).to.have.property('messages');
        expect(filtered).to.have.property('errorCount');
        expect(filtered).to.have.property('warningCount');
    });

    it('should not alter message objects', function() {
        var result = {
            messages: [
                { a: 'message' }
            ]
        };
        var messageClone = JSON.parse(JSON.stringify(result.messages[0]));

        var filtered = filter(result);

        expect(filtered.messages[0]).to.deep.equal(messageClone);
    });

    it('should count the errors and warnings', function() {
        var result = {
            messages: [
                { severity: 2 },
                { severity: 2 },

                { severity: 1 }
            ]
        };

        var filtered = filter(result);

        expect(filtered.errorCount).to.equal(2);
        expect(filtered.warningCount).to.equal(1);
    });

});
