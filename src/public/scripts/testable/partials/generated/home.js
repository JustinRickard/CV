var home_html = '<!-- TODO: Use a template --> \
 \
<div id="home-links" data-bind="foreach: Model.MenuItems"> \
	 \
	<!-- ko if: !SubItems || SubItems.length === 0 --> \
		<div class="home-link-container" data-bind="click: Select"> \
			<h1 data-bind="text: Page.DisplayName"></h1> \
		</div> \
	<!-- /ko --> \
 \
	<!-- ko if: SubItems && SubItems.length > 0 --> \
	<div> \
		<div class="home-sub-item" data-bind="foreach: SubItems"> \
			<div class="home-link-container" data-bind="click: Select"> \
				<h1 data-bind="text: Page.DisplayName"></h1> \
			</div> \
		</div> \
	</div> \
	<!-- /ko --> \
	</div> \
</div> \
';
