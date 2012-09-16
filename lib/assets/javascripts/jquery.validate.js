(function($) {


	var rules = {

		name: /([A-Za-z-'\s])$/,
		alpha: /([a-zA-Z])$/,
		email: /([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

	},

	/**
	 * The checkTextField function handles all validation and return either
	 * a boolean value (valid: true) or the promise of the remote call
	 */
	checkTextField = function($field, $input, bQuick) {

		// Get me data
		var options = $field.data("validate"),
			bValid = true,
			sError = "",
			oError = {};


		// Get value
		var val = $input.val();

		// Optional and empty?
		if (options.optional === true && val.length === 0) {
			bValid = true;
		}

		// Check optional/mandatory
		if (bValid && options.optional !== true && val.length === 0) {
			bValid = false;
			sError = "empty";
		}

		// Min-length?
		if (bValid && typeof options["min-length"] === "number" && val.length < options["min-length"]) {
			bValid = false;
			sError = "minlength";
			oError = { minlength: options["min-length"] };
		}

		// Can the rule be found?
		if (bValid && typeof options["rule"] === "string" 
				&& (typeof rules[options["rule"]] === "function" || 
					typeof rules[options["rule"]] === "object")) {
			
			// Function?
			if (typeof rules[options["rule"]] === "function") {

				// Call function
				if (!rules[options["rule"]](val)) {
					bValid = false;
					sError = options["rule"];
				}

			} else { 

				// Test the expression
				var pattern = rules[options["rule"]];

				if (pattern.test(val) === false) {
					bValid = false;
					sError = options["rule"];
				}

			}
			
		}

		// Same as?
		if (bValid && typeof options["same_as"] === "string") {
			
			// Find the form field defined in 'same_as'
			var $inputSibling = $input.closest("form").find("input[name='" + options["same_as"] + "']");
			if ($inputSibling.length === 0) {
				$.error("Couldn't find the same_as field.");
				return;
			}

			// Same?
			if ($input.val() !== $inputSibling.val()) {
				bValid = false;
				sError = "sameas";
			}

			

		}

		// Remote validation?
		if (bValid && typeof options["remote"] === "string") {

			// Remotely validate adn return the promise
			return remoteValidate($field, $input, options["remote"]);


		} else {

			// Apply messag now
			applyMessage($field, bValid, sError, oError, bQuick);
			return bValid;

		}


		

	},

	checkSelectBox = function($field, $input, bQuick) {

		// Get me data
		var options = $field.data("validate"),
			bValid = true,
			sError = "",
			oError = {};


		// Get value
		var val = $input.val();

		// Null or empty string?
		if (bValid && options["optional"] !== true && (typeof val === "undefined" || val === null || val === "")) {

			// Empty!
			bValid = false;
			sError = "emptyselect";

		}

		// Remote validation?
		if (bValid && typeof options["remote"] === "string") {

			// Remotely validate and return the promise
			return remoteValidate($field, $input, options["remote"]);


		} else {

			// Apply messag now
			applyMessage($field, bValid, sError, oError, bQuick);
			return bValid;

		}



	},


	remoteValidate = function($field, $input, sRemoteUrl) {

		// Create a wrapper promise
		var promise = $.Deferred();

		// Get the error
		$.ajax({
			url: sRemoteUrl,
			type: "post",
			dataType: "json",
			data: {
				value: $input.val()
			}

		}).then(function(result) {

			// Valid?
			if (result.valid === true) {
				applyMessage($field, true);
			} else {
				applyMessage($field, false, result.message, result.error, false);
			}

			// Resolve promise
			promise.resolve(result.valid);

		}).fail(function(result) {

			// Set error
			applyMessage($field, false, "remoteerror", {}, false);

			// Resolve promise
			promise.resolve(false);


		});

		// Return the promise
		return promise;

	},






	applyMessage = function($field, bValid, sError, oError, bQuick) {

		// Valid?
		$field.toggleClass("valid", bValid);
		if (bQuick === true) {
			$field.removeClass("error", !bValid);
		} else {
			$field.toggleClass("error", !bValid);

			// Error?
			if (!bValid) {

				// Lookup message
				var sMessage = I18n.t("frontend.validation.errors." + sError, oError);

				// Message not found?
				if (typeof sMessage === "undefined") {
					$.error("Could not find '" + sError + "' in the error i18n dictionary");
					return;
				}

				// Set it
				$field.attr('data-validate-message', sMessage);

			}

		}

	},


	parseValidationData = function (dataValidate, options) {

		if (typeof(dataValidate) === "string") {
					
			// Parse it
			$.each(dataValidate.split(","), function(index, line) {

				// Split on :
				var pair = line.split(":"),
					key = $.trim(pair[0]),
					value = $.trim(pair[1]);

				// Boolean?
				if (String(value).toLowerCase() === "true") value = true;
				if (String(value).toLowerCase() === "false") value = false;

				// Numeric value?
				if ($.isNumeric(value)) {
					value = value * 1;
				}

				
				// Store it
				options[key] = value;

			});

		}


	},


	methods = {

		"init": function(options) {

			return this.each(function() {

				// Localize variables
				var $field = $(this),
					$input = $field.find("input,select,textarea"),
					options = {};

				// Parse the data-validate attribute
				parseValidationData($input.attr("data-validate"), options);
				
				// Store options in data field
				$field.data("validate", options);

				// Is it a text or e-mail field?
				var validateResult;
				if ($input.is("input[type=text],input[type=email],input[type=password],textarea")) {
					
					// Add a text change event
					$input.bind("keyup", function(e) {
						checkTextField($field, $input, true);
					});
					$input.bind("blur", function(e) {
						checkTextField($field, $input, false);
					});
					$input.bind("focus", function(e) {
						checkTextField($field, $input, true);
					});

					// Check it now
					validateResult = checkTextField($field, $input, true);


				// Is it a select box?
				} else if ($input.is("select")) {

					// Change event
					$input.bind("change", function(e) {
						checkSelectBox($field, $input);
					});

					// Check it now
					validateResult = checkSelectBox($field, $input, true);

				} else {

					$.error("No validation implemented for ", $input);

				}




			});


		},

		"validate": function(options) {

			return this.each(function() {

				// Localize variables
				var $field = $(this),
					$input = $field.find("input,select,textarea");

				// Check to make sure a onComplete option was passed
				if (typeof options.onComplete !== "function" && typeof options.promise !== "object") {
					$.error("You need to pass an onComplete handler or a promise ($.Deferred) object to the validate option, to allow for remote validation.");
				}

				// Is it a text or e-mail field?
				var validateResult;
				if ($input.is("input[type=text],input[type=email],input[type=password],textarea")) {
				
					// Check it not
					validateResult = checkTextField($field, $input, false, true);

				// Is it a select box?
				} else if ($input.is("select")) {

					// Check it now
					validateResult = checkSelectBox($field, $input);

				} else {

					$.error("No validation implemented for ", $input);

				}

				// Check result
				if (typeof validateResult === "boolean") {

					// Call on complete function
					if (typeof options.onComplete === "function") {
						options.onComplete(validateResult);
					}

					// Resolve
					if (typeof options.promise === "object" && typeof options.promise.resolve === "function") {
						options.promise.resolve(validateResult);
					}

				} else if (typeof validateResult === "object") {

					// Wait for the promise to resolve
					validateResult.then(function(result) {

						// Call on complete function
						if (typeof options.onComplete === "function") {
							options.onComplete(result);
						}

						// Resolve
						if (typeof options.promise === "object" && typeof options.promise.resolve === "function") {

							options.promise.resolve(result);
						}


					});

				}


			});



		}

	};

	$.fn.validate = function(method) {

		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.validate' );
		} 

	};



})(jQuery);