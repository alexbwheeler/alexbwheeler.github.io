
(function ($) {
	'use strict';

	// -- Navigation -- //

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;
	var History = window.History;

	// State change event
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();

		// Loading state
		$('body').addClass('loading');

		// Load the page
		$('.page-loader').load( state.hash + ' .page_content', function() {

			// Find transition time
			var transitionTime = 450;

			$('.active-link').removeClass('active-link');

			// After current content fades out
			setTimeout( function() {

				// Remove old content
				$('.page .page_content').remove();

				// Append new content
				$('.page-loader .page_content').appendTo('.page');

				// Set page title
				docTitle = $('.page_content').attr('data-page-title');
				document.title = docTitle;
				$('body').attr('data-title', document.title.split(" ")[0].toLowerCase());

				// Run page functions
				pageFunctions();

			}, transitionTime);

		});

	});


	// On clicking a link
	if ( $('body').hasClass('ajax-loading') ) {

		$(document).on('click', 'a', function (event){

			// Don't follow link
			event.preventDefault();

			// Get the link target
			var thisTarget = $(this).attr('href');

			// If we don't want to use ajax, or the link is an anchor/mailto/tel
			if ( $(this).hasClass('js-no-ajax') || /^#/.test(thisTarget) || thisTarget.indexOf("mailto:") >= 0 || thisTarget.indexOf("tel:") >= 0 ) {

				// Use the given link
				window.location = thisTarget;
			}

			// If link is handled by some JS action – e.g. fluidbox
			else if ( $(this).is('.gallery__item__link') ) {
				
				// Let JS handle it
			}

			// If link is external
			else if ( thisTarget.indexOf('http') >= 0 ) {

				// Go to the external link
				window.open(thisTarget, '_blank');

			}

			// If link is internal
			else {

				// Change navTarget
				navTarget = thisTarget;
				
				// Switch the URL via History
				History.pushState(null, docTitle, thisTarget);
			}

		});

	}



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {

		$('.active-link').removeClass('active-link');

		// --- Show content --- //

		// Wait until first image has loaded
		$('.page_content').find('img:first').imagesLoaded( function() {

			window.scrollTo(0, 0);

			// Show the content
			$('body').removeClass('loading');

			// Hide the menu
			$('body').removeClass('menu_open');
		});

		// Set page URL
		$('body').attr('data-page-url', window.location.pathname);

		// Update navTarget
		navTarget = $('body').attr('data-page-url');

		// --- Active links --- //

		for (var i = 0; i < document.links.length; i++) {
			var link = document.links[i];
			var linkTarget = link.href;

		    if (linkTarget == document.URL || linkTarget + "/" == document.URL) {
		        document.links[i].classList.add('active-link');
		    }

		    if (link.classList.contains("menu__list__item__link") && document.URL.includes(linkTarget)) {
		        document.links[i].classList.add('active-link');
		    }
		}

		// ajax load page script
		gsap.registerPlugin(ScrollTrigger);
		gsap.registerPlugin(Flip);
		ScrollTrigger.refresh();

		var pageId = $(".page_content").attr("id");
		if (pageId == "index") {$.getScript("/js/splash.js");} 
		else if (pageId == "portfolio") {$.getScript("/js/work.js");}
		else if (pageId == "contact") {$.getScript("/js/contact.js");}

		var zoomin = gsap.utils.toArray('.zoomin');

		ScrollTrigger.matchMedia({
			// mobile
		  "(max-width: 1023px)": function() {

		  	zoomin.forEach((zoomin) => {
			 		gsap.from(zoomin, { 
				  	scale: 0.8,
				    scrollTrigger: {
				        trigger: zoomin,
				        start: 'top bottom',
				        scrub: true,
				        end: 'top 70%',
				    }
					});	  
				});

		  },
		  // desktop
		  "(min-width: 1023px)": function() {

		  	zoomin.forEach((zoomin) => {
			 		gsap.from(zoomin, { 
				  	scale: 0.5,
				    scrollTrigger: {
			        trigger: zoomin,
			        start: 'top bottom',
			        scrub: true,
			        end: 'bottom top',
				    }
					});	  
				});

		  },
		});

		

		// --- Galleries --- //

		// Destroy all existing waypoints
		Waypoint.destroyAll();

		// Set up count for galleries to give them unique IDs
		var galleryCount = 0;

		// If there's a gallery
		$('.gallery').each( function() {

			// Get gallery element
			var $this = $(this);

			// Add ID via count
			galleryCount++;
			var thisId = 'gallery-' + galleryCount;
			$this.attr('id', thisId);

			// Gallery columns
			var galleryCols = $this.attr('data-columns');

			// Set up gallery container
			$this.append('<div class="gallery__wrap"></div>');

			// Add images to container
			$this.children('img').each( function() {
				$(this).appendTo('#' + thisId + ' .gallery__wrap');
			});

			// Wrap images
			$this.find('.gallery__wrap img').each( function() {
				var imageSrc = $(this).attr('src');
				$(this).wrapAll('<div class="gallery__item"><a href="' + imageSrc + '" class="gallery__item__link"></div></div>').appendTo();
			});

			// Wait for images to load
			$this.imagesLoaded( function() {

				// If it's a single column gallery
				if ( galleryCols === '1' ) {

					// Add carousel class to gallery
					$this.addClass('gallery--carousel');

					// Add owl styles to gallery wrap
					$this.children('.gallery__wrap').addClass('owl-carousel');

					// Use carousel
					$this.children('.gallery__wrap').owlCarousel({
						items: 1,
						loop: true,
						mouseDrag: false,
						touchDrag: true,
						pullDrag: false,
						dots: true,
						autoplay: false,
						autoplayTimeout: 6000,
						autoHeight: true,
						animateOut: 'fadeOut'
					});

					// When scrolling over the bottom
					var waypoint1 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {

								// console.log('pause');
							
								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}

							if ( direction === 'up') {

								// console.log('play');
								
								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}
						},
						offset: '-100%'
					});

					// When scrolling over the top
					var waypoint2 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {

								// console.log('play');
								
								// Play this carousel
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}

							if ( direction === 'up') {

								// console.log('pause');
							
								// Pause this carousel
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}
						},
						offset: '100%'
					});

				}

				else {

					$this.addClass('gallery--grid');

					// Use masonry layout
					$this.children('.gallery__wrap').masonry({
						itemSelector: '.gallery__item',
						transitionDuration: 0
					});
							
					// Init fluidbox
					$this.find('.gallery__item__link').fluidbox({
						loader: true
					});

				}

				// Show gallery once initialized
				$this.addClass('gallery--on');
			});

		});


		// --- Images --- //

		$('.single p > img').each( function() {
			var thisP = $(this).parent('p');
			$(this).insertAfter(thisP);
			$(this).wrapAll('<div class="image-wrap"></div>');
			thisP.remove();
		});



		// -- Videos -- /

		// For each iframe
		$('.single iframe').each( function() {

			// If it's YouTube or Vimeo
			if ( $(this).attr('src').indexOf('youtube') >= 0 || $(this).attr('src').indexOf('vimeo') >= 0 ) {

				var width = $(this).attr('width');
				var height = $(this).attr('height');
				var ratio = (height/width)*100;

				// Wrap in video container
				$(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');

			}

		});

		// --- Other --- //
		
		// Lazy Load
		var lazyLoadInstance = new LazyLoad({
		    elements_selector: ".lazy",
		});

		// AOS Animations
		AOS.init();
		$('.animate').removeClass('visible');
		// Animate objects
		animateMe();

		// // Update language toggle
		// setTimeout(function(){ 
		// 	$("#lang").load(location.href + " #lang>*", "");
		// }, 500);

		// setTimeout(function(){f
		// 	if (window.scrollY < 50) {
		// 		window.scrollTo(0, 0);
		// 	}
		// }, 400);

		$( 'body, html' ).animate({
			scrollTop: 0
		}, 50);	
	}



	// Run functions on load
	pageFunctions();

	// Menu //

	$(document).on('click', '.js-menu-toggle', function (){

		// If already open
		if ( $('body').hasClass('menu_open') ) {
			$('body').removeClass('menu_open');
		}

		// If not open
		else {
			$('body').addClass('menu_open');
		}
	});

	$(document).on('click', '.menu__list__item__link', function (){

		// If menu is open when you click a link on mobile
		if ( $('.menu').hasClass('menu_open') ) {
			$('.menu').removeClass('menu_open');
		}
	});

	// Header hide

	var prevScrollpos = window.pageYOffset;

	window.onscroll = function() {
		var currentScrollPos = window.pageYOffset;

		if (prevScrollpos > currentScrollPos || window.scrollY < 50) {
			$(".header").removeClass("up");
		} else if (!$("body").hasClass("menu--open")) {
			$(".header").addClass("up");
		}

		prevScrollpos = currentScrollPos;
	}

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

	// Site logo refresh on mouseover
	$( "img#site_logo" ).mouseover(function() {
		document.getElementById('site_logo').src='/images/logo-black-wipe.gif'
	});


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Contact Form

	// Override the submit event
	$(document).on('submit', '#contact-form', function (e) {

		// Clear previous classes
		$('.contact-form__item--error').removeClass('contact-form__item--error');

		// Get form elements
		var emailField = $('.contact-form__input[name="email"]');
		var nameField = $('.contact-form__input[name="name"]');
		var messageField = $('.contact-form__textarea[name="message"]');
		var gotchaField = $('.contact-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate message
		if ( messageField.val() === '' ) {
			messageField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// If all fields are filled, except gotcha
		if ( emailField.val() !== '' && nameField.val() !== '' && messageField.val() !== '' && gotchaField.val().length === 0 ) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});
	
}(jQuery));



// Close the dropdown menu if the user clicks outside of it
/*window.onclick = function(event) {
  if (!event.target.matches('.filter')) {
    var dropdowns = document.getElementsByClassName("filter");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('visible')) {
        openDropdown.classList.remove('visible');
      }
    }
  }
}*/

//Animate when in viewport with IntersectionObserver

function animateMe() {

	//IntersectionObserver

	if (('IntersectionObserver' in window) || ('IntersectionObserverEntry' in window) || ('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
		config = {
			root: null,
			rootMargin: '1000% 1px 20% 1px',
			threshold: [0,0.5,1]
		};

		animate = document.querySelectorAll('.animate');

		observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {

				if (entry.intersectionRatio > 0.7) {

					if ($(entry.target).hasClass( "gif" )) {
						const lazyImage = entry.target;

			            lazyImage.src = lazyImage.dataset.src;

			            if (document.documentElement.clientWidth < 768) {
			            	observer.unobserve(entry.target);
			            }
			        }

			        if ($(entry.target).hasClass("once")) {
			        	observer.unobserve(entry.target);
			        }

			        entry.target.classList.add('visible');

				} else {
					$(entry.target).removeClass('visible');
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