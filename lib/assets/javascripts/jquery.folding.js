(function($) {

	var methods = {

		"init": function(options) {

			return this.each(function() {

				// Default options
				var settings = $.extend({
					titleClass: "folding-title",
					contentClass: "folding-content",
					openClass: "open",
					fieldSelector: ".field"
				}, options);

				// Get objects
				var $container = $(this),
					$title = $container.find("." + settings.titleClass),
					$content = $container.find("." + settings.contentClass);

				// Header click
				$title.bind("click", function(e) {
					e.preventDefault();

					// Open/close?
					if ($container.hasClass(settings.openClass)) {

						// Close
						$container.removeClass(settings.openClass);
						$content.slideUp(250);

					} else {

						// Open
						$container.addClass(settings.openClass);
						$content.slideDown(250, function() {

							// Find first field and set focus in it (if none found, that's fine)
							$container.find(settings.fieldSelector + ":first").find("input,select,textarea").focus();

						});

					}

				})


			});

		}

	};

	$.fn.folding = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.folding' );
		} 

	};



})(jQuery);