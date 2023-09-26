// GSAP Splash page

ScrollTrigger.saveStyles(".splash_graphic_wrap");
ScrollTrigger.saveStyles(".manifesto2");

ScrollTrigger.matchMedia({

	// mobile
  "(max-width: 1023px)": function() {

  	gsap.to("#blueBox", {
  		scrollTrigger: {
		    trigger: ".splash2",
		    start: "-10px top",
		    end: "+=800",
		    scrub: 0.2,
		  }, width: "80%",
  	});

  	gsap.set("#text_ring", {
		transformOrigin: "50% 50%",
	});

  	var tlSplashMobile = gsap.timeline({
  		scrollTrigger: {
		    trigger: ".manifesto2",
		    start: "top bottom",
		    end: "top 200px",
		    scrub: 0.5,
		}
	});

	tlSplashMobile.to("#text_ring", {rotation: 180, duration: 2});
	tlSplashMobile.to("#index", {background: "black", duration: 1.5}, "<1");
	tlSplashMobile.to(".splash_grid", {opacity: 0, duration: 1}, "<");
	tlSplashMobile.to(".splash2", {opacity: 0, duration: 0.5}, "<");

	gsap.from(".splash_graphic_wrap", {scale: 0.8, opacity: 0, duration: 1});
	gsap.from(".splash_text_item", {opacity:0, stagger: 0.1, duration: 1, delay: 0.2});
	
  },

  // desktop
  "(min-width: 1023px)": function() {

 
  },
});


// --- Hover Gallery --- //

$(".hover_gallery_title").hover(function(){

	var project = "." + $(this).attr("ref");

	console.log(project);

	$(".project_image").removeClass("active");
	$(project).addClass("active");

	$(".project_info").removeClass("active");
	$(project).addClass("active");

});

$("titles").mouseleave(function(){
	$(".project_info").removeClass("active");
});

// Tilt
VanillaTilt.init(document.querySelectorAll("#splash-graphic"), {
	reverse: false,
	max: 8,
	easing: "cubic-bezier(0.555, 0.005, 0.470, 0.995)",
	speed: 1000,
	transition: true,
	reset: true,
	"full-page-listening": true,
});
