'use strict';

module.exports = function filter (result, ruleId, keyword) {
    var filtered = {
        filePath: result.filePath,
        messages: [],
        errorCount: 0,
        warningCount: 0
    };

    function keep (message) {
        filtered.messages.push(message);
        if (message.severity === 1) {
            filtered.warningCount++;
        } else if (message.severity === 2) {
            filtered.errorCount++;
        }
    }

    result.messages.forEach(function (message) {
        if (ruleId) {
            if (message.ruleId === ruleId) {
                keep(message);
            }
        } else if (keyword) {
            var regex = new RegExp(keyword);
            if (regex.test(message.message)) {
                keep(message);
            }
        } else {
            keep(message);
        }
    });

    return filtered;
};
