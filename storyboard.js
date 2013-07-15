(function($) {
	function processStep(step) {
		var dfr = $.Deferred();

		if (typeof step == 'function') {
			step(dfr);
		} else if (typeof step == 'number') {
			$.when((function() {
				setTimeout(function() {
					dfr.resolve();
				}, step);
				return dfr;
			}()));
		}

		return dfr.promise();
	}

	$.storyboard = function(steps) {
		var currentStep = 0;

		function walkStep() {
			var dfr = processStep(steps[currentStep]);
			currentStep++;

			if (currentStep < steps.length) {
				dfr.done(walkStep);
			}
		}

		walkStep(steps[currentStep]);
	}
}(jQuery));