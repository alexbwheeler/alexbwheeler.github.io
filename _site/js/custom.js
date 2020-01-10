
// @codekit-prepend "/plugins/history.js"
// @codekit-prepend "/plugins/imagesloaded.js"
// @codekit-prepend "/plugins/masonry.js"
// @codekit-prepend "/plugins/debounce.js"
// @codekit-prepend "/plugins/fluidbox.js"
// @codekit-prepend "/plugins/owl.js"
// @codekit-prepend "/plugins/waypoints.js"

(function ($) {
	'use strict';

	// play showcase slideshow once showcase images have loaded
	$('.splash').find('#preload_splash').imagesLoaded( { background: true }, function() {
		splashAutoplay();
	});

	pageLoad();

	// On page load
	function pageLoad() {

		WebpIsSupported(function(isSupported){
		    if(isSupported){
		        $(".noWebp").removeClass("noWebp");
		    }
		});

		// Fade-ins
		AOS.init();

		if (window.pageYOffset < 100) {
			$( 'body, html' ).animate({
				scrollTop: 0
			}, 300);
		}

		MyIntersectionObserver();

		// Lazy load 
		var lazyLoadInstance = new LazyLoad({
		    elements_selector: ".lazy",
		});
	
		// Tilt
		VanillaTilt.init(document.querySelectorAll(".say_hi>div"), {
			
		});

		splashTime = 1;

		if(document.getElementById("showcase_previous")!=null){
			document.getElementById("showcase_next").onclick = function() {showcase_next() };
			document.getElementById("showcase_previous").onclick = function() {showcase_previous()};
		}

		setTimeout(function(){ 
			$("#lang").load(location.href + " #lang>*", "");
		}, 500);
	}

	
	History.Adapter.bind(window,'statechange',function(){
		setTimeout(function(){ 
			pageLoad();
		}, 500);
	});


	$(document).on("click", "a", function(){
	    setTimeout(function(){
			pageLoad();
		}, 500);
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


	// Site logo refresh on mouseover
	$( "img.header__logo__img" ).mouseover(function() {
		document.getElementById('site_logo').src='/images/logo-black-wipe.gif'
	});

	// - - - Auto play splash slideshow - - - //
	var splashTime = 1;

	function splashAutoplay() {

		setInterval(checkTime, 1000); 

		function checkTime () {
			if (document.documentElement.dataset.scroll == 0) {
				splashTime++;

				if (splashTime == 5) {
					showcase_next();
				}
			}
			else {
				splashTime == 1;
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

	  if (prevScrollpos > currentScrollPos || window.pageYOffset < 30) {

	    $(".header").addClass("down");

	  } else {

		$(".header").removeClass("down");

	  }

	  prevScrollpos = currentScrollPos;
	}

}(jQuery));

//Animate when in viewport with IntersectionObserver

function MyIntersectionObserver() {

	//IntersectionObserver

	if (('IntersectionObserver' in window) || ('IntersectionObserverEntry' in window) || ('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
		const config = {
			root: null,
			rootMargin: '1000px 1px 20% 1px',
			threshold: [0,1]
		};

		const animate = document.querySelectorAll('.animate');

		observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {

				if (entry.intersectionRatio > 0.95) {

					if ($(entry.target).hasClass( "slow_lazy" )) {
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
		var fallbackLazy = $('.slow_lazy');
		fallbackLazy.addClass('lazy');
		fallbackLazy.removeClass('slow_lazy');

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

// Detect Webp support

function WebpIsSupported(callback){
    // If the browser doesn't has the method createImageBitmap, you can't display webp format
    if(!window.createImageBitmap){
        callback(false);
        return;
    }

    // Base64 representation of a white point image
    var webpdata = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';

    // Retrieve the Image in Blob Format
    fetch(webpdata).then(function(response){
        return response.blob();
    }).then(function(blob){
        // If the createImageBitmap method succeeds, return true, otherwise false
        createImageBitmap(blob).then(function(){
            callback(true);
        }, function(){
            callback(false);
        });
    });
}


