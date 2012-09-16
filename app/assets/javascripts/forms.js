$(document).ready(function() {
	
	// Already done?
	if (typeof $.bandman !== "undefined") return;

	// Generic ajax error handler
	$.bandman = {};
	$.bandman.onError = function(e, error) {
		
		// Show notification
		$.notification.show({
			type: "error",
			ajaxError: error
		});

	};

	// Initialize rich forms
	$("form.rich").richForm();

	// Enrich multi select boxes
	$("select[multiple]").multiSelectTags();

	// Enrich step forms
	$(".form.steps").stepWizard();

	// Activate ajax forms and show its errors in notification
	$(".form.ajax").ajaxForm()
		.bind("error", $.bandman.onError);

	// Set default notification area
	$.notification.defaultTarget = $(".main");

	// Folding
	$(".folding").folding();

});


