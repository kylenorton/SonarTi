// Declaring variables to prevent implied global error
var Ti;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#a3c2e0');

Ti.include(
	// Sonar libraries
	'sonar/sonar.js',
	'sonar/ui.js',
	'sonar/datetime.js',
  	
  	'ui/ModalActivityIndicatorWindow.js',	
	'ui/ActivityView.js',
	'ui/test.js',
  	'ui/main.js'
);

Ti.API.info('hello world');
