

(function ($) {
	'use strict';

	// // play showcase slideshow once showcase images have loaded
	// $('#preload_splash').imagesLoaded( { background: true }, function() {
	// 	splashAutoplay();
	// });

	pageLoad();

	setTimeout(function(){ 
		$( 'body, html' ).animate({
			scrollTop: 0
		}, 200);
	}, 500);

	// On page load
	function pageLoad() {

		$('.animate').removeClass('visible');
		MyIntersectionObserver();

		// AOS.init();

		// Lazy load 
		// var lazyLoadInstance = new LazyLoad({
		//     elements_selector: ".lazy",
		// });
		
		// Tilt
		// if (document.documentElement.clientWidth > 768) {
		// 	VanillaTilt.init(document.querySelectorAll(".say_hi>div"));
		// 	VanillaTilt.init(document.querySelectorAll(".portfolio-item__image img.front"));
		// }

		// splashTime = 1;

		// if(document.getElementById("showcase_previous")!=null){
		// 	document.getElementById("showcase_next").onclick = function() {showcase_next() };
		// 	document.getElementById("showcase_previous").onclick = function() {showcase_previous()};
		// }

		setTimeout(function(){ 
			$("#lang").load(location.href + " #lang>*", "");
		}, 500);
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

	// Site logo refresh on mouseover
	// $( "img#site_logo" ).mouseover(function() {
	// 	document.getElementById('site_logo').src='/images/logo-black-wipe.gif'
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

	// - - - Header hide - - - //

	// var prevScrollpos = window.pageYOffset;

	// window.onscroll = function() {
	// 	var currentScrollPos = window.pageYOffset;

	// 	if (prevScrollpos > currentScrollPos || window.scrollY < 50) {
	// 		$(".header").removeClass("up");
	// 	} else if (!$("body").hasClass("menu--open")) {
	// 		$(".header").addClass("up");
	// 	}

	// 	prevScrollpos = currentScrollPos;
	// }

	// Parallax Scrolling Portfolio
	$(window).bind('scroll',function(){
	    parallaxScroll();
	});

	function parallaxScroll(){
	    var scrolled = $(window).scrollTop();
	    $('#portfolio2').css('top',(100-(scrolled*.15))+'px');
	}

}(jQuery));


//Animate when in viewport with IntersectionObserver

function MyIntersectionObserver() {

	//IntersectionObserver

	if (('IntersectionObserver' in window) || ('IntersectionObserverEntry' in window) || ('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
		config = {
			root: null,
			rootMargin: '1000px 1px 20% 1px',
			threshold: [0,1]
		};

		animate = document.querySelectorAll('.animate');

		observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {

				if (entry.intersectionRatio > 0.95) {

					if ($(entry.target).hasClass( "gif" )) {
						const lazyImage = entry.target;

			            lazyImage.src = lazyImage.dataset.src;

			            if (document.documentElement.clientWidth < 768) {
			            	observer.unobserve(entry.target);
			            }
			        }

			        entry.target.classList.add('visible');
				}
			});
		}, config);

		animate.forEach(image => {
		  observer.observe(image);
		}, config);

	} else {
		//IntersectionObserver Fallback for slow_lazy and animate classes
		var fallbackLazy = $('.gif');
		fallbackLazy.addClass('lazy');
		fallbackLazy.removeClass('gif');

		$(window).scroll(function(event) {
			$('.animate').each(function(i, el) {
				var el = $(el);
			    if (el.visible(true)) {
					el.addClass("visible"); 
				}
			 });
		});
	}
}


//IntersectionObserver fallback script
(function($) {

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

// --- HTML Store Scroll Position --- //

// The debounce function receives our function as a parameter
const debounce = (fn) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;
  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }
    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  } 
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}
// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });
// Update scroll position for first time
storeScroll();


