'use strict';

var destinationsHelper = {
    getDestinations : function (destinations, currentFilePath) {

        var destinationIdentifier;

        if (typeof destinations === 'string') {
            return destinations;
        }

        for (var p in destinations) {

            if (destinations.hasOwnProperty(p)) {

                destinationIdentifier = destinationsHelper.getDestinationIdentifier(destinations[p], currentFilePath);

                if (destinations[p].indexOf(destinationIdentifier) > -1) {
                    return destinations[p];
                }
            }
        }

        throw new Error('Cannot determine destination for file.');
    },
    getDestinationIdentifier : function (destination, currentFilePath) {

        var splitIdentifier = destination.split('/')[0];
        var splitIndex = currentFilePath.indexOf('/' + splitIdentifier + '/');
        var filePath = currentFilePath.slice(splitIndex + 1, currentFilePath.length);

        return filePath.split('/')[1];
    }
};

module.exports = destinationsHelper;
