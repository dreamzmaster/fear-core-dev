'use strict';

function filter (result) {
    return result;
}

describe.only('linting result object filter', function () {

    describe('when provided with a result object having no messages', function () {

        it('should return the original result object', function() {
            var result = {
                messages: []
            };
            var filtered = filter(result);
            expect(filtered).to.eql(result);
        });

    });

});
