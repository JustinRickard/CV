/// <reference path="../scripts/external/DefinitelyTyped/requirejs/require.d.ts" />

var Home_Html: string = '\
<div id="home" data-bind="visible: Model.CurrentPage()===1">	\
	<h1 data-bind="text: StaticText.Current.Home_Title"></h1>	\
	<p data-bind="text: StaticText.Current.Home_Paragraph1"></p>	\
</div>	\
';
