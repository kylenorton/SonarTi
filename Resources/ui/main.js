(function () {
   //require components
	var NavigationController = require('ui/NavigationController').NavigationController;
	//create NavigationController which will drive our simple application
	var controller = new NavigationController();
	
	//open initial window
	controller.open(new Sonar.ui.createActivityView(controller));
	
})();