/*eslint-disable */
var page = require('webpage').create();
var system = require('system');

/** Classic waitFor example from PhantomJS
 */
function waitFor(testFx, onReady, timeOutMillis) {
	var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 60000, //< Default Max Timout is 60s
		start = new Date().getTime(),
		condition = false,
		interval = setInterval(function() {
			if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
				// If not time-out yet and condition not yet fulfilled
				condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
			} else {
				if (!condition) {
					// If condition still not fulfilled (timeout but condition is 'false')
					console.log("'waitFor()' timeout");
					phantom.exit(1);
				} else {
					// Condition fulfilled (timeout and/or condition is 'true')
					typeof(onReady) === "string" ? eval(onReady): onReady(); //< Do what it's supposed to do once the condition is fulfilled
					clearInterval(interval); //< Stop this interval
				}
			}
		}, 250); //< repeat check every 250ms
}

var waitScript = function() {
	if (window.performance && window.performance.timing) {
		return ((window.performance.timing.loadEventEnd > 0) && ((new Date).getTime() - window.performance.timing.loadEventEnd > 6000));
	} else {
		return true;
	}
}

page.open('http://127.0.0.1:8000'+system.args[1], function(status) {

	if (status !== 'success') {
		console.log('Unable to load the address!');
	} else {
		page.title = page.evaluate(function() {
			return document.title;
		});

		mainDoc = page.evaluate(function() {
			return document;
		});

		mainBody = page.evaluate(function() {
			return document.body;
		});

        console.log(page.content);

		phantom.exit();

	}
});
/*eslint-enable */