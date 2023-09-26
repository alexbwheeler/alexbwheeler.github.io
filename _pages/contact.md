---
title: Contact

subtitle: Hey! Let's talk about your next project.

description: Get in touch to discuss your project and receive a quote.

lang: en
layout: default

scripts: <script src="/js/contact.js"></script>
ref: contact
---

<section class="intro" data-aos="fade-in" data-aos-duration="1000">
	<h1 class="center">Contact</h1>
	<p class="center"><a href="mailto:{{ site.data.settings.contact_settings.contact_email }}?http" target="_blank"> {{ site.data.settings.contact_settings.contact_email }} </a></p>
</section>

<section class="single">
	<div class="narrow_wrap">
		{% include contact-form.html %}
	</div>
</section>
