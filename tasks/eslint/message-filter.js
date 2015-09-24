'use strict';

module.exports = function filter (result, ruleId) {
    var filtered = {
        filePath: result.filePath,
        messages: [],
        errorCount: 0,
        warningCount: 0
    };

    result.messages.forEach(function (message) {
        if (ruleId) {
            if (ruleId && message.ruleId === ruleId) {
                filtered.messages.push(message);
                if (message.severity === 1) {
                    filtered.warningCount++;
                } else if (message.severity === 2) {
                    filtered.errorCount++;
                }
            }
        } else {
            filtered.messages.push(message);
        }
    });

    return filtered;
};
