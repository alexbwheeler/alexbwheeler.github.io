

(function ($) {
	'use strict';

	// // play showcase slideshow once showcase images have loaded
	// $('#preload_splash').imagesLoaded( { background: true }, function() {
	// 	splashAutoplay();
	// });

	pageLoad();

	// On page load
	function pageLoad() {

		// splashTime = 1;

		// if(document.getElementById("showcase_previous")!=null){
		// 	document.getElementById("showcase_next").onclick = function() {showcase_next() };
		// 	document.getElementById("showcase_previous").onclick = function() {showcase_previous()};
		// }
	}

	
	History.Adapter.bind(window,'statechange',function(){
		setTimeout(function(){ 
			pageLoad();
		}, 500);
	});


	// Language change
	// $(document).on("click", "#lang a", function(){

	// 	$("#header").addClass("hide");

	//     setTimeout(function(){ 
	// 		$("#navlinks").load(location.href + " #navlinks>*", "");
	// 		$("#head_logo").load(location.href + " #head_logo>*", "");

	// 		setTimeout(function(){ 
	// 			$("#header").removeClass("hide");

	// 			document.getElementById('site_logo').src='/images/logo-black.gif';

	// 			$( "img.header__logo__img" ).mouseover(function() {
	// 				document.getElementById('site_logo').src='/images/logo-black-wipe.gif'
	// 			});
	// 		}, 100);
	// 	}, 500);
	// });

	/*

	// - - - Auto play splash slideshow - - - //
	var splashTime = 1;

	function splashAutoplay() {

		setInterval(checkTime, 1000); 

		function checkTime () {
			if (window.scrollY < 100) {
				splashTime++;

				if ( splashTime > 3 ) {
					showcase_next();
				}
			}
			else {
				splashTime == 2;
			}
		}
	}



	// - - - Next Slide - - - ///
	function showcase_next() {
		splashTime = 0;

		if ($(".splash").hasClass("slide1") == true) {
			$(".splash").addClass("slide2");
			$(".splash").removeClass("slide1");
		}

		else if ($(".splash").hasClass("slide2") == true) {
			$(".splash").addClass("slide3");
			$(".splash").removeClass("slide2");
		}

		else if ($(".splash").hasClass("slide3") == true) {
			$(".splash").addClass("slide4");
			$(".splash").removeClass("slide3");
		}

		else if ($(".splash").hasClass("slide4") == true) {
			$(".splash").addClass("slide1");
			$(".splash").removeClass("slide4");
		}
	}



	// - - - Previous Slide - - - //
	function showcase_previous() {
		splashTime = 0;

		if ($(".splash").hasClass("slide1") == true) {
			$(".splash").addClass("slide4");
			$(".splash").removeClass("slide1");
		}

		else if ($(".splash").hasClass("slide2") == true) {
			$(".splash").addClass("slide1");
			$(".splash").removeClass("slide2");
		}

		else if ($(".splash").hasClass("slide3") == true) {
			$(".splash").addClass("slide2");
			$(".splash").removeClass("slide3");
		}

		else if ($(".splash").hasClass("slide4") == true) {
			$(".splash").addClass("slide3");
			$(".splash").removeClass("slide4");
		}
	}
*/

}(jQuery));


