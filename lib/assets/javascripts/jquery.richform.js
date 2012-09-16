(function($) {

	var methods = {

		"init": function(options) {

			// Check if validate plugin is also loaded
			if (typeof $.fn.validate !== "function") {
				$.error("The jQuery.richForm cannot function without the jQuery.validate plugin.");
				return;
			}

			return this.each(function() {

				// Merge options with default settings
				var settings = $.extend({

					fieldSelector: ".field",
					inputSelector: "input[type=text],input[type=password],input[type=email],select,textarea",

					wrapperClass: "input",
					iconClass: "icon",

					submitSelector: ".submit"

				}, options);

				// Localize variables
				var $form = $(this);				

				// Submit button action
				$form.find(settings.submitSelector).bind("click", function(e) {
					e.preventDefault();
					$form.submit();
				})

				// Add a validation wrapper around every field
				$form.find(settings.fieldSelector).each(function(index, field) {

					// Find the input
					var $input = $(field).find(settings.inputSelector),
						$field = $(field);


					// Wrap the input
					$input.wrap($("<div>").addClass(settings.wrapperClass));
					var $wrapper = $input.parent();
					
					// Add icon
					var $icon = $("<div>").addClass(settings.iconClass).appendTo($wrapper);
					var $toolTip = null;
					// Add hover events
					$icon.bind("mouseover", function() {

						// Error?
						if (!$field.hasClass("error")) {
							return;
						}

						// Create?
						if ($toolTip === null) {
							$toolTip = $.createTooltip({
								target: $icon
							});	
						}					

						// Show tooltip
						$toolTip.tooltip("show", {
							message: $field.attr("data-validate-message")
						});

					}).bind("mouseout", function() {

						// Tooltip?
						if ($toolTip === null) {
							return;
						}

						// Hide tooltip
						$toolTip.tooltip("hide");

					});

					// Add validation to the input
					$(field).validate();

				});



			});

		}

	};

	$.fn.richForm = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.richForm' );
		} 

	};



})(jQuery);