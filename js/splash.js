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

  	var tlSplashMobile = gsap.timeline({
  		scrollTrigger: {
		    trigger: ".manifesto2",
		    start: "top bottom",
		    end: "bottom 200px",
		    scrub: 0.5,
		  }
		 });

  	//tlSplashMobile.from(".manifesto2", {transform:"scale(0.8)", duration: 3});
  	tlSplashMobile.from(".candy", {color: "black", duration: 1}, 1);

  	gsap.from(".splash_text_title", {
  		y: "30px",
  		opacity: 0,
  		duration: 0.5,
  		delay: 0.5,
  		stagger: 0.15,
  	});

  	gsap.from(".splash_button", {
  		opacity: 0,
  		duration: 0.5,
  		delay: 1,
  	});
  },

  // desktop
  "(min-width: 1023px)": function() {

  	var tlSplashDesktop = gsap.timeline({
  		scrollTrigger: {
		    trigger: ".splash2",
		    start: "top top",
		    end: "+=500",
		    scrub: 0.5,
		    pin: true,
		  },
  	})

  	tlSplashDesktop.addLabel("splash")
  	tlSplashDesktop.to(".splash2", {opacity: 0, duration: 1});
  	tlSplashDesktop.to("#blueBox", {width: "80%", duration: 1}, "<");
  	tlSplashDesktop.to(".splash_text", {transform: "scale(0.9)", stagger: 0.2, duration: 2}, "<")

  	tlSplashDesktop.fromTo(".manifesto2", {opacity: 0}, {opacity: 1, duration: 1}, 1);
  	tlSplashDesktop.to(".candy", {color: "blue"}, "<3");
  	tlSplashDesktop.addLabel("manifesto");

  	var tlSplashDesktop2 = gsap.timeline({
  		scrollTrigger: {
		    trigger: ".manifesto2",
		    start: "top top",
		    end: "100% top",
		    scrub: 0.5,
		    pin: true,
		  }
		 });

  	tlSplashDesktop2.fromTo(".manifesto2", {transform: "scale(0.8)"}, {transform: "scale(1)", duration: 3});

  	gsap.from(".splash_text_title", {
  		x: "-40px",
  		opacity: 0,
  		duration: 0.5,
  		delay: 0.5,
  		stagger: 0.15,
  	});

  	gsap.from(".splash_button", {
  		opacity: 0,
  		duration: 0.5,
  		delay: 1,
  	});
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
	reverse: true,
	max: 15,
	easing: "cubic-bezier(0.555, 0.005, 0.470, 0.995)",
	speed: 1000,
	"full-page-listening": true
});
