(function($) {

	var methods = {

		"init": function(options) {

			return this.each(function() {

				// Localize variables
				var $select = $(this);

				// Create box
				var $box = $("<div>").addClass("multiselect-box");

				// Loop original's options
				$select.find("option").each(function(index, option) {

					// Create tag
					var $tag = $("<span>")
							.addClass("multiselect-tag")
							.text($(option).text())
							.toggleClass("selected", $(option).attr("selected") == "selected")
							.data("tag-option", $(option))
							.appendTo($box);

					// Add click event
					$tag.bind("click", function(e) {
						
						e.preventDefault();

						// Toggle selected class
						$(this).toggleClass("selected");

						// Apply to option in the original select box
						if ($(this).hasClass("selected")) {
							$(this).data("tag-option").attr("selected", "selected");
						} else {
							$(this).data("tag-option").removeAttr("selected");
						}

						// Dispatch the change event on the selectbox
						$select.trigger("change");

					})

				});

				// Add next to original
				$select.after($box);
				
				// Hide original
				$select.hide();

			});

		}

	};

	$.fn.multiSelectTags = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.multiSelectTags' );
		} 

	};



})(jQuery);