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

  	var tlSplashDesktop = gsap.timeline({
  		scrollTrigger: {
		    trigger: ".splash2",
		    start: "top top",
		    end: "+=500",
		    scrub: 0.5,
		    pin: true,
		  },
  	});

  	gsap.set("#text_ring", {
		transformOrigin: "50% 50%",
	});

	gsap.from(".splash_graphic_wrap", {scale: 0.9, opacity: 0, duration: 1});
	gsap.from(".splash_text_item", {opacity:0, stagger: 0.1, duration: 1, delay: 0.2});


	//splashscroll
  	tlSplashDesktop.addLabel("splash")
  	tlSplashDesktop.to(".blueBox", {padding: "200px", duration: 2});
  	tlSplashDesktop.to("#text_ring", {rotation: 180, duration: 2}, "<");
  	tlSplashDesktop.to(".splash_text", {transform: "scale(0.9)", stagger: 0.2, duration: 2}, "<")

  	tlSplashDesktop.to(".splash2", {opacity: 0, duration: 1}, 1);
  	tlSplashDesktop.to("#index", {background: "black", duration: 1.5});
  	
  	
  	tlSplashDesktop.fromTo(".manifesto2", {opacity: 0}, {opacity: 1, duration: 1}, "<1")
  	tlSplashDesktop.to("#grid-one", {
  		transform: "scaleX(1) scaleY(1) scaleZ(1) rotateX(49deg) rotateY(15deg) rotateZ(15deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg)", 
  		top: 500,
  		duration: 5,
  	}, 0);
  	tlSplashDesktop.to("#grid-two", {
  		transform: "scaleX(1) scaleY(1) scaleZ(1) rotateX(-64deg) rotateY(-22deg) rotateZ(-24deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg)",
  		bottom: 500, 
  		duration: 5,
  	}, 0);
  	tlSplashDesktop.to(".splash_grid", {opacity: 0.2, duration: 2}, 0);
  	tlSplashDesktop.addLabel("manifesto");

	let tl = gsap.timeline({
	  scrollTrigger: {
	    trigger: ".index",
	    start: "300px",
	    end: "4000px",
	    toggleClass: "dark",
	  },
	});

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
  	tlSplashDesktop2.fromTo(".splash_grid", {opacity: 0.2}, {opacity: 0, duration: 1});

  	let tlFeatured = gsap.timeline({
	  scrollTrigger: {
	    trigger: "#featuredwork",
	    start: "bottom bottom",
	    end: "top 400px",
	    scrub: 0.1,
	  },
	});

	tlFeatured.from("#featuredwork", {opacity: "0", duration: 3});
	//tlFeatured.to(".manifesto2", {opacity: "0", duration: 2}, "<");
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
