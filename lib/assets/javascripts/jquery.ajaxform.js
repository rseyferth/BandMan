(function($) {

	var methods = {

		"init": function(options) {

			return this.each(function() {

				// Merge settings
				var settings = $.extend({
					loadingClass: "loading",
					loadingImageClass: "loading-image",
					completeClass: "form-complete",
					resetLinkClass: "reset-form",
					fieldSelector: ".field"
				}, options);
				
				// Extract information
				var $divForm = $(this),
					$form = $divForm.find("form")
					$complete = $divForm.find("." + settings.completeClass),
					sAction = $form.attr("action"),
					sMethod = $form.attr("method") || "POST";

				// Store settings
				$divForm.data("ajaxForm", settings);

				// Create the ajax load screen
				var $loadScreen = $("<div>").addClass(settings.loadingClass),
					$loadImage = $("<div>").addClass(settings.loadingImageClass);
				$loadScreen.append($loadImage).appendTo($divForm);
				

				// Find reset form lnks
				$divForm.find("." + settings.resetLinkClass).bind("click", function(e) {
					
					e.preventDefault();
					$divForm.ajaxForm("reset");

				});

				// Replace submit handler
				$form.bind("submit", function(e) {

					e.preventDefault();

					// Validate all fields
					var validatePromises = [];
					$form.find(settings.fieldSelector).each(function(index, field) {

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
							
							// Show ajax loader (block, and fade in a little later)
							$loadScreen.css({
								width: $divForm.outerWidth(),
								height: $divForm.outerHeight()
							}).fadeIn(200);
							$loadImage.css({
								position: "absolute",
								left: $loadScreen.width() / 2 - $loadImage.width() / 2,
								top: $loadScreen.height() / 2 - $loadImage.height() / 2
							});
							

							// Collect data
							var data = $form.serialize();

							// Create the ajax call
							$.ajax({

								url: sAction,
								type: sMethod,
								dataType: "json",
								data: data

							}).then(function(result) {

								// Hide the form, show success
								$form.hide();
								$complete.show();

								// Trigger complete
								$divForm.trigger("success", result);


							}).fail(function(result) {

								// Trigger error
								$divForm.trigger("error", result);

							}).always(function() {

								// Disable the loadscreen
								$loadScreen.stop().hide();

							});

						} else {

							// Nothing doin'
							return;

						}

					});
					


					

				});

			});


		},

		"reset": function(options) {

			return this.each(function() {

				// Get settings
				var settings = $(this).data("ajaxForm");

				// Find the form
				var $divForm = $(this),
					$form = $divForm.find("form")
					$complete = $divForm.find("." + settings.completeClass);

				// Empty fields
				$form.get(0).reset();

				// Show form again, hide complete
				$form.show();
				$complete.hide();

				// Focus on 1st field
				$form.find(settings.fieldSelector + ":first").find("input,select,textarea").focus();


			});

		}

	};

	$.fn.ajaxForm = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.ajaxForm' );
		} 

	};



})(jQuery);