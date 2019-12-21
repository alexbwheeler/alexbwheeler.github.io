
// @codekit-prepend "/plugins/history.js"
// @codekit-prepend "/plugins/imagesloaded.js"
// @codekit-prepend "/plugins/masonry.js"
// @codekit-prepend "/plugins/debounce.js"
// @codekit-prepend "/plugins/fluidbox.js"
// @codekit-prepend "/plugins/owl.js"
// @codekit-prepend "/plugins/waypoints.js"

(function ($) {
	'use strict';

	pageLoad();
	AOS.init();

	// play showcase slideshow once showcase images have loaded
	$('.splash').find('#preload_splash').imagesLoaded( { background: true }, function() {
		splashAutoplay();
	});

	
	History.Adapter.bind(window,'statechange',function(){
		setTimeout(function(){ 
			pageLoad();
		}, 500);
	});


	$(document).on("click", "a", function(){
	    setTimeout(function(){ 
			pageLoad();
		}, 500);


	    // Make sure the header has the right class
		if (location.pathname == /about/ || location.pathname == '/fr/a-propos/') {
			$(".header").addClass("transparent");
		}
		else {
			$(".header").removeClass("transparent");
		}

		$(".header").removeClass("down");
	});


	// Language change
	$(document).on("click", "#lang a", function(){

		$("#header").addClass("hide");

	    setTimeout(function(){ 
			$("#navlinks").load(location.href + " #navlinks>*", "");
			$("#head_logo").load(location.href + " #head_logo>*", "");

			setTimeout(function(){ 
				$("#header").removeClass("hide");

				document.getElementById('site_logo').src='/images/logo-black.gif';

				$( "img.header__logo__img" ).mouseover(function() {
					document.getElementById('site_logo').src='/images/logo-black-wipe.gif'
				});
			}, 100);
		}, 500);
	});



	// Parallax Scrolling Portfolio
	$(window).bind('scroll',function(){
	    parallaxScroll();
	});

	function parallaxScroll(){
	    var scrolled = $(window).scrollTop();
	    $('#portfolio2').css('top',(100-(scrolled*.15))+'px');
	}

	// Sticky sidebar
	// $(function() {
	// 	moveScroller();
	// });

	// function moveScroller() {
	//     var $anchor = $("#scroller-anchor");
	//     var $scroller = $('#scroller');

	//     var move = function() {
	//         var st = $(window).scrollTop();
	//         var ot = $anchor.offset().top;
	//         if(st > ot) {
	//             $scroller.css({
	//                 position: "fixed",
	//                 top: "0px"
	//             });
	//         } else {
	//             $scroller.css({
	//                 position: "relative",
	//                 top: ""
	//             });
	//         }
	//     };
	//     $(window).scroll(move);
	//     move();
	// }


	// On page load
	function pageLoad() {
		AOS.init();

		splashTime = 1;

		if(document.getElementById("showcase_previous")!=null){
			document.getElementById("showcase_next").onclick = function() {showcase_next() };
			document.getElementById("showcase_previous").onclick = function() {showcase_previous()};
		}

		setTimeout(function(){ 
			$("#lang").load(location.href + " #lang>*", "");
		}, 500);

		document.getElementById("header").style.top = "0";
	}



	// Site logo refresh on mouseover
	$( "img.header__logo__img" ).mouseover(function() {
		document.getElementById('site_logo').src='/images/logo-black-wipe.gif'
	});




	// - - -Auto play splash slideshow - - - //
	var splashTime = 1;

	function splashAutoplay() {
		console.log('showcase images have loaded');

		setInterval(checkTime, 1000); 

		function checkTime () {
			splashTime++;

			if (splashTime == 5) {
				showcase_next();
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



	// - - - Header hide - - - //

	var prevScrollpos = window.pageYOffset;

	window.onscroll = function() {
	  var currentScrollPos = window.pageYOffset;
	  if (prevScrollpos > currentScrollPos) {
	    document.getElementById("header").style.top = "0";

	    $(".header").addClass("down");

	  } else {
	    document.getElementById("header").style.top = "-140px";

		$(".header").removeClass("down");
	  }
	  prevScrollpos = currentScrollPos;
	}

}(jQuery));





