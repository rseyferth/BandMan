$(document).ready(function(){

	$.todo = {};
	$.todo.target = $(".main-content .todo-detail");

	// Load the todo from json
	$.todo.load = function() {

		// Get data source
		var sUrl = $.todo.target.attr("data-source");

		// Empty and set to loading
		$.todo.target.empty().addClass("loading");

		// Load 
		$.ajax({

			url: sUrl,
			dataType: "json"

		}).then(function(result) {

			// Add single one
			$.todo.show(result);
			
		}).fail(function(result) {

			// Show error
			alert("ERROR");

		}).done(function() {

			// No longer loading.
			$.todo.target.removeClass("loading");

		});
		

	};

	// Render the todo to screen
	$.todo.show = function(oTodo) {
		console.log(oTodo);

		// Check check icon
		var $checkIcon = $("<div>")
							.addClass("icon")
							.addClass("check"),

		$groupLink = $("<a>")
							.addClass("breadcrumb")
							.attr("href", Routes.band_todo_group_path('<%= @current_band.to_param %>', oTodo.groupinfo.to_param))
							.html(oTodo.groupinfo.title),

		// Create header
		$header = $("<h2>")
						.append($checkIcon)
						.append($groupLink)
						.append(
							$("<span>").html(oTodo.title)
						)
						.appendTo($.todo.target),

		// Details
		$todoDetails = $("<div>")
						.addClass("todo-details")
						.addClass("indent")
						.appendTo($.todo.target),

		// Ul
		$ulStatuses = $("<ul>")
						.addClass("statuses")
						.appendTo($todoDetails);

		
		// Render statuses
		$.todo.addStatuses(oTodo);




		console.log(oTodo);

	};

	// Render statuses
	$.todo.addStatuses = function(oTodo) {

		// Get ul
		var $ul = $.todo.target.find("ul.statuses").empty();

		// Loop statuses
		$.each(oTodo.todo_statuses, function(index, oStatus) {

			$.todo.addStatus(index, oStatus)

		});

	}

	$.todo.addStatus = function(index, oStatus) {

		// Get ul
		var $ul = $.todo.target.find("ul.statuses");
		
		// Format time
		var sTime = $.timeago(oStatus.created_at);

		// Format status
		var sWord = "";
		if (oStatus.completed === true) {
			sWord = I18n.translate("frontend.todos.statuses.completed");
		} else if (oStatus.in_progress === true) {
			sWord = I18n.translate("frontend.todos.statuses.started");
		} else if (index === 0) {
			sWord = I18n.translate("frontend.todos.statuses.created");
		} else {
			sWord = I18n.translate("frontend.todos.statuses.reset");
		}

		// Create li
		var $li = $("<li>")
						.html(I18n.translate("frontend.todos.statuses.item", { 
							status: sWord,
							time: sTime,
							user: oStatus.user.fullname
						}))
						.appendTo($ul);
	}


	// Load now
	$.todo.load();


});