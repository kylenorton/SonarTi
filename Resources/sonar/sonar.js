var Sonar = {
	android: {
		menu: {}	
	},
	datetime: {},
    ui: {},
    __isLargeScreen: undefined,
    __isAndroid: undefined
};

(function() {	
	Sonar.extend = function(obj) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    for (var i = 0; i < args.length; i++) {
	    	var source = args[i];
	      	for (var prop in source) {
	        	if (source[prop] !== void 0) obj[prop] = source[prop];
	      	}
	    }
	    return obj;
	};
	
	Sonar.isLargeScreen = function() {
		if (Sonar.__isLargeScreen === undefined) {
			Sonar.__isLargeScreen = (Ti.Platform.displayCaps.platformWidth >= 600);
		}
		return Sonar.__isLargeScreen;
	};
	
	Sonar.isAndroid = function() {
		if (Sonar.__isAndroid === undefined) {
			Sonar.__isAndroid = (Ti.Platform.osname == 'android');
		}
		return Sonar.__isAndroid;
	}
	
	// Sonar.android.menu = {
		// data: [],
		// init: function(params) {
			// var activity = params.win.activity; 
	        // activity.onCreateOptionsMenu = function (e) {
	          	// var optionsmenu = e.menu;
	          	// for (k = 0; k < params.buttons.length; k++) {
	            	// Sonar.android.menu.data[k] = optionsmenu.add({
	              		// title: params.buttons[k].title
	            	// });
	            	// Sonar.android.menu.data[k].addEventListener("click", params.buttons[k].clickevent);
	          	// }
	        // };
		// }
	// };
})();