'use strict';


// Global vars
var navTarget = $('body').attr('data-page-url');
var docTitle = document.title;
var History = window.History;

loadPage ();

window.onpopstate = function() {
	loadPage ();
}

function loadPage (){
	var state = History.getState();
	// console.log(state);

	// Loading state
	$('body').addClass('loading');

	// Load the page
	$('.page-loader').load( state.hash + ' .page__content', function() {

		// Scroll to top
		$( 'body, html' ).animate({
			scrollTop: 0
		}, 300);

		// Find transition time
		var transitionTime = 400;

		// After current content fades out
		setTimeout( function() {

			// Remove old content
			$('.page .page__content').remove();

			// Append new content
			$('.page-loader .page__content').appendTo('.page');

			// Set page URL
			$('body').attr('data-page-url', window.location.pathname);

			// Update navTarget
			navTarget = $('body').attr('data-page-url');

			// Set page title
			docTitle = $('.page__content').attr('data-page-title');
			document.title = docTitle;

		}, transitionTime);

	});
};