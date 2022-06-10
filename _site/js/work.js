// filter projects

$(".filterToggle" ).click(function() {

	let filterToggle = this.id;
  const projects = Flip.getState(".project");

  if (filterToggle == "all") {$(".project").addClass("visible")}
  	else {
	  $(".project:not(."+filterToggle+")").removeClass("visible");
		$("."+filterToggle).addClass("visible");
	}
  
  Flip.from(projects, {
    absolute: true,
    duration: 0.5, 
    fade: true,
    onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.8}, {opacity: 1, scale: 1 }),
    onLeave: elements => gsap.fromTo(elements, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.8}),
    ease: "power1.inOut",
  });

  document.getElementById("filter").classList.remove("visible");
});

ScrollTrigger.matchMedia({
  // desktop
  "(min-width: 1023px)": function() {

    // portfolio page header disapear
    gsap.to(".my_finest_work", {
    	scrollTrigger: {
        trigger: ".my_finest_work",
        start: "-20px top",
        end: "80% top",
        scrub: 0.5,
     	},
     	opacity: 0, 
     	y: "100px",
    });
  }
});

// Filter Project Toggle

$("#filter_button").click(function() {
  document.getElementById("filter").classList.toggle("visible");
});

// grid view / list view

$(".viewToggle").click(function() {
	let filterToggle = this.id;

	if (filterToggle == "grid") {
		$(".case_studies").addClass("grid");
	} else {
		$(".case_studies").removeClass("grid");
	}
});