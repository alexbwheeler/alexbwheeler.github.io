---

title: Work

description: Graphic and web design portfolio. Branding and logo design, motion graphics, posters and more.

ref: portfolio

layout: default

lang: en

---

<div class="narrow_wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">

	<div class="intro">
		<h1>
			<span data-aos="fade-right" data-aos-delay="400" data-aos-duration="1000">My</span>
			<span data-aos="fade-right" data-aos-delay="600" data-aos-duration="1000">Finest</span>
			<span class="work" data-aos="fade-right" data-aos-delay="800" data-aos-duration="1000">work</span>
		</h1>
	</div>

	{% assign projects=site.projects | where:"lang", page.lang %}
	{% include case-studies.html %}

</div>