(function($) {

	$.notification = {};
	$.notification.defaultTarget = null;
	$.notification.i18n_promise = null;

	// Public function
	$.notification.show = function(options) {

		// Do it on the default target
		$.notification.defaultTarget.notification(options);

	}

	var methods = {

		"init": function(options) {

			return this.each(function() {

				// Mrge options
				var settings = $.extend({

					type: "error",
					ajaxError: null,
					title: "",
					message:"",

					notificationClass: "notification",
					errorClass: "error",
					infoClass: "info",
					warningClass: "warning",

					headerHtml: "<h2>",
					iconClass: "icon",

					autoHide: 5000
					
				}, options);

				// Store target
				var $target = $(this);

				// Create div
				var $notification = $("<div>")
						.addClass(settings.notificationClass);

				// Create title, icon and p
				var $icon = $("<div>").addClass(settings.iconClass).appendTo($notification),
					$header = $(settings.headerHtml).appendTo($notification),
					$message = $("<p>").appendTo($notification);
					
				// Add appropriate class for type
				if (settings.type === "error") $notification.addClass(settings.errorClass);
				if (settings.type === "info") $notification.addClass(settings.infoClass);
				if (settings.type === "warning") $notification.addClass(settings.warningClass);

				// Extract message from ajaxError?
				if (settings.ajaxError !== null) {

					// Set title
					$header.html(I18n.t("frontend.validation.notification." + settings.type));

					// Unprocessable entity?
					if (settings.ajaxError.status === 422) {

						// Check if some of the error message kan be used
						alert('field error');

					} else {

						// Use status code
						$message.html(I18n.t("frontend.validation.status." +settings.ajaxError.status));

					}


					// Prepend and show
					$notification.hide().prependTo($target).slideDown(250);

				} else {

					// Set title and message
					$header.html(settings.title);
					$message.html(settings.message);

					// Prepend and show
					$notification.hide().prependTo($target).slideDown(250);

				}


				// Auto hide?
				if (settings.autoHide !== false && settings.autoHide !== 0) {

					// Delayed hide
					$notification.delay(settings.autoHide).slideUp(250, function() {

						// Destroy me
						$notification.remove();

					});

				}

				

			});

		}

	};


	$.fn.notification = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.notification' );
		} 

	};



})(jQuery);