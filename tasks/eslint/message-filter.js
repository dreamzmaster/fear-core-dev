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

    function hasRuleId (message) {
        return message.ruleId === ruleId;
    }

    function containsKeyword (message) {
        return new RegExp(keyword).test(message.message);
    }

    result.messages.forEach(function (message) {
        if (ruleId) {
            if (hasRuleId(message)) {
                keep(message);
            }
        } else if (keyword) {
            if (containsKeyword(message)) {
                keep(message);
            }
        } else {
            keep(message);
        }
    });

    return filtered;
};
