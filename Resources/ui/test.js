(function () {	
    Sonar.ui.createTestWindow = function (navController) {
		//create activityWindow instance
		var testWindow = Ti.UI.createWindow({
			title:'Test',
			backgroundColor:'#fff',
	        barColor: '#414444',
	        fullscreen: false
		});
	    
	   	var add = Ti.UI.createButton({
			title:'Add A New Window',
			height:'50dp',
			width:'200dp',
			top:'20dp'
		});
		add.addEventListener('click', function() {
			navController.open(new Sonar.ui.createTestWindow(navController));
		});
		
	   	var test = Ti.UI.createButton({
			title:'test',
			height:'50dp',
			width:'200dp',
			top:'90dp'
		});
		test.addEventListener('click', function() {
			var ODataHelper = require('odata/ODataHelper').ODataHelper;
			Ti.API.addEventListener('odata_collections_loaded', function(data) {
				textArea.setValue(data.result);
			});
			
			var odata = new ODataHelper("https://services.parivedasolutions.com/sonardev/DataService/Activities()?$filter=(ActivityDate ge datetime'2012-02-22T00:00:00') and (ActivityDate le datetime'2012-02-22T00:00:00')");
			odata.getCollections();
		});
		//label using localization-ready strings from <app dir>/i18n/en/strings.xml
		var textArea = Ti.UI.createTextArea({
			color:'#000000',
			value:"Hello World",
			height:'200',
			width:'300',
			top: '150dp',
			editable: false,
			font:{fontSize:10},
			borderColor : '#000',
		});
		
		
		testWindow.add(add);
		testWindow.add(test);
		testWindow.add(textArea);
			
		return testWindow;
	}
})();