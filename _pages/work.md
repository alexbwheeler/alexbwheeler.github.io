---

title: Work

description: Graphic and web design portfolio. Branding and logo design, motion graphics, posters and more.

ref: portfolio

layout: default

lang: en

---

<div class="narrow_wrap">

	<div class="intro">
		<h1 class="my_finest_work">
			<span data-aos="fade-right" data-aos-delay="400" data-aos-duration="1000">My</span>
			<span data-aos="fade-right" data-aos-delay="600" data-aos-duration="1000">Finest</span>
			<span class="work" data-aos="fade-right" data-aos-delay="800" data-aos-duration="1000">work</span>
		</h1>
	</div>
</div>

<div class="portfolio">
	<div class="filter_wrap" id="filterWrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" data-aos-once="true">
		<div>
			<div id="filter" class="filter narrow_wrap">
				<div class="view_toggle">
					<input type="radio" name="viewToggle" value="caseStudies" id="caseStudies" checked="checked"/>
			    	<label for="caseStudies" id="list" class="viewToggle" checked="checked">
			    		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 390.7 350.5" style="enable-background:new 0 0 390.7 350.5;" xml:space="preserve">
							<g><line class="st0" x1="35" y1="35" x2="355.7" y2="35"/></g>
							<g><line class="st0" x1="35" y1="175.2" x2="355.7" y2="175.2"/></g>
							<g><line class="st0" x1="35" y1="315.5" x2="355.7" y2="315.5"/></g>
						</svg>
			    		List
			    	</label>

			        <input type="radio" name="viewToggle" id="gridView"/>
			        <label for="gridView" value="grid" id="grid" class="viewToggle">
			        	<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 365.6 350.5" style="enable-background:new 0 0 365.6 350.5;" xml:space="preserve">
							<g>
								<g>
									<line class="doticon" x1="330.6" y1="35" x2="330.6" y2="35"/>
								</g>
								<g>
									<line class="doticon" x1="330.6" y1="175.2" x2="330.6" y2="175.2"/>
								</g>
								<g>
									<line class="doticon" x1="330.6" y1="315.5" x2="330.6" y2="315.5"/>
								</g>
							</g>
							<g>
								<g>
									<line class="doticon" x1="182.8" y1="35" x2="182.8" y2="35"/>
								</g>
								<g>
									<line class="doticon" x1="182.8" y1="175.2" x2="182.8" y2="175.2"/>
								</g>
								<g>
									<line class="doticon" x1="182.8" y1="315.5" x2="182.8" y2="315.5"/>
								</g>
							</g>
							<g>
								<g>
									<line class="doticon" x1="35" y1="35" x2="35" y2="35"/>
								</g>
								<g>
									<line class="doticon" x1="35" y1="175.2" x2="35" y2="175.2"/>
								</g>
								<g>
									<line class="doticon" x1="35" y1="315.5" x2="35" y2="315.5"/>
								</g>
							</g>
						</svg>
			        	Grid
			        </label>
				</div>

				<button id="filter_button" class="filter_button">Filter</button>

				<div id="filter_categories" class="filter_categories">
			    	<input type="radio" name="category" value="allWork" id="allWork" checked="checked"/>
			    	<label for="allWork" id="all" class="filterToggle" checked="checked">All</label>

			        <input type="radio" name="category" id="logoBranding"/>
			        <label for="logoBranding" value="logo" id="logo" class="filterToggle">Logo / Branding</label>

			        <input type="radio" name="category" value="graphicDesign" id="graphicDesign"/>
			        <label for="graphicDesign" id="graphic-design" class="filterToggle">Graphic Design</label>

			        <input type="radio" name="category" value="motionGraphics" id="motionGraphics"/>
			        <label for="motionGraphics" id="motion" class="filterToggle" >Motion</label>
				</div>
			</div>
		</div>
	</div>

	<div class="narrow_wrap case_studies_wrap" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" data-aos-once="true">
		{% assign projects=site.projects | where:"lang", page.lang %}
		{% include case-studies.html %}
	</div>
</div>