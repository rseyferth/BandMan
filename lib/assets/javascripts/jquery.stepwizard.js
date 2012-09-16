(function($) {

	var methods = {

		"init": function(options) {
			
			// Check if validate plugin is also loaded
			if (typeof $.fn.validate !== "function") {
				$.error("The jQuery.stepWizard cannot function without the jQuery.validate plugin.");
				return;
			}

			return this.each(function() {

				// Merge with default settings
				var settings = $.extend({

					stepSelector: ".step",
					navSelector: ".step-navigation",
					navItemSelector: "li",
					nextButtonSelector: "a.next-step",
					prevButtonSelector: "a.prev-step",
					formSelector: "form",
					fieldSelector: ".field",

					activeClass: "active",
					inactiveClass: "inactive",
					completedClass: "complete",


					currentStep: 0


				}, options);

				// Localize objects
				var $wizard = $(this),
					$steps = $wizard.find(settings.stepSelector),
					$nav = $wizard.find(settings.navSelector),
					$navItems = $nav.find(settings.navItemSelector),
					$form = $wizard.find(settings.formSelector);

				// Loop the steps
				$steps.each(function(index, step) {

					// Get objects
					var $step = $(step),
						$navItem = $($navItems[index]),
						$nextButton = $step.find(settings.nextButtonSelector),
						$prevButton = $step.find(settings.prevButtonSelector),
						$fields = $step.find(settings.fieldSelector);

					// Add click event to next button
					$nextButton.bind("click", function(e) {
						e.preventDefault();

						// Validate all fields
						var validatePromises = [];
						$fields.each(function(index, field) {

							// Validate it
							var promise = $.Deferred();
							$(field).validate("validate", {
								promise: promise
							});

							// Add promise
							validatePromises.push(promise);

						});

						// Wait for all validations to be complete
						$.when.apply(this, validatePromises).then(function() {
							
							// Check if all arguments were true
							var bValid = true;
							for (var q = 0; q < arguments.length; q++) {
								if (arguments[q] === false) {
									bValid = false;
									break;
								}
							}
							
							// Valid?
							if (bValid) {

								// Next step!
								nextStep();

							} else {

								// Nothing doin'
								return;

							}

						});
						

					});

					// Add click event to previous button
					$prevButton.bind("click", function(e) {

						// Previous!
						prevStep();

					});
					

				});

				// Add navigation
				$navItems.bind("click", function(e) {
					e.preventDefault();

					// Is it allowed to go to the selected step?
					var nIndex = $(this).index();
					if (nIndex >= settings.currentStep) { return; }
					gotoStep(nIndex);

				});


				var gotoStep = function(stepIndex) {

					// Do the switch
					settings.currentStep = stepIndex;
				
					// Apply classes
					$steps.each(function(index, step) {

						// Get objects
						var $step = $(step),
							$navItem = $($navItems[index]);

						$step
							.toggleClass(settings.activeClass, index === settings.currentStep)
							.toggleClass(settings.inactiveClass, index !== settings.currentStep);
						$navItem
							.toggleClass(settings.activeClass, index === settings.currentStep)
							.toggleClass(settings.inactiveClass, index !== settings.currentStep)
							.toggleClass(settings.completedClass, index < settings.currentStep);

						// Current one?
						if (index === settings.currentStep) {

							// Find first form element to put focus in
							$step.find(settings.fieldSelector + ":first").find("input,select,textarea").focus();

						}

					});


				},

				nextStep = function() {

					// Is that possible?
					if (settings.currentStep === $steps.length - 1) {

						// Submit the form
						$form.submit();

					} else {

						// Move!
						gotoStep(settings.currentStep + 1);

					}
					
				},

				prevStep = function() {

					// Is that possible?
					if (settings.currentStep === 0) return;

					// Goto!
					gotoStep(settings.currentStep - 1);

				}


				// Goto selected step
				gotoStep(settings.currentStep);




			});

		}

	};


	$.fn.stepWizard = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.stepWizard' );
		} 

	};



})(jQuery);