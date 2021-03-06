var experience_html: string = '<div id="experience"> \
<h1 data-bind="text: StaticText.Current.Experience_Title"></h1> \
 \
	<h2 data-bind="text: StaticText.Current.Experience_Server"></h2> \
	<div class="exerience-table-container"> \
		<div data-bind="template: { name: \'experience-template\', foreach: Model.ExperienceServer }"></div> \
	</div> \
 \
	<div class="exerience-table-container"> \
		<h2 data-bind="text: StaticText.Current.Experience_Database"></h2> \
		<div data-bind="template: { name: \'experience-template\', foreach: Model.ExperienceDatabase }"></div> \
	</div> \
 \
	<div class="exerience-table-container"> \
		<h2 data-bind="text: StaticText.Current.Experience_FrontEnd"></h2> \
		<div data-bind="template: { name: \'experience-template\', foreach: Model.ExperienceFrontEnd }"></div> \
	</div> \
</div> \
';