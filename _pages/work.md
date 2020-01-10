---

title: Work

header: My finest work

description: Graphic and web design portfolio. Logos, posters, brochures, branding, visual identity, and more.

ref: portfolio

lang: en

---

{% assign projects=site.projects | where:"lang", page.lang %}

{% include portfolio.html %}

<p class="align_center">
	<a href="{{ base.url }}/blog" class="button large black center">See more recent projects on my blog!</a>
</p>

