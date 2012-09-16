(function($) {

	var methods = {

		"init": function(options) {

			return this.each(function() {

				// Merge options with default settings
				var settings = $.extend({

					destroyOnHide: false,
					autoShow: false,

					classTooltip: "tooltip",
					classArrow: "arrow",

					showDelay: 250

				}, options);				

				// Get item
				var $toolTip = $(this),
					$target = settings.target;

				// Store settings
				$toolTip.data("tooltip", settings);

				// Create message
				var $message = $("<span>").appendTo($toolTip)

				// Create arrow
				var $arrow = $("<div>")
								.addClass(settings.classArrow)
								.appendTo($toolTip);

				// Add classes
				$toolTip.addClass(settings.classTooltip).hide().appendTo("body");

				// Set message
				if (typeof settings.message !== "undefined") {
					$message.html(settings.message);
				}


			});

		},

		"show": function(options) {

			return this.each(function() {

				// Get tooltip
				var $toolTip = $(this),
					$message = $toolTip.find("span");

				// Get settings and target position
				var settings = $toolTip.data("tooltip"),
					$target = settings.target,
					$arrow = $toolTip.find('.' + settings.classArrow),
					targetPos = $target.offset();
				
				// Message?
				if (typeof options.message !== "undefined") {
					$message.html(options.message);
				}

				// Fade in
				$(this).delay(settings.showDelay).fadeIn(200);

				// Position the arrow
				$arrow.css({
					left: $toolTip.outerWidth() / 2 - $arrow.width() / 2
				});

				// Position the tooltip
				$toolTip.css({
					position: "absolute",
					left: targetPos.left - $toolTip.outerWidth() / 2 + $target.width() / 2,
					top: targetPos.top - $toolTip.outerHeight() - 9
				})


			});

		},

		"hide": function(options) {

			return this.each(function() {

				// Fade out
				$(this).stop().hide();

			});

		}


	};


	$.fn.tooltip = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.validate' );
		} 

	};


	$.createTooltip = function(options) {

		// Create a div
		return $("<div>").tooltip(options);

	};



})(jQuery);