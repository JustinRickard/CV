// TODO: Move out to a .html file.

var About_Html: string = ' \
<div id="about" data-bind="visible: Model.CurrentPage()===2"> \
	<h1 data-bind="text: StaticText.Current.About_Title"></h1>	\
	<p data-bind="text: StaticText.Current.About_Paragraph1"></p>	\
</div> \
';