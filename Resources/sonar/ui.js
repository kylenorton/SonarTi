(function() {
	//Set configuration variables and defaults is necessary
	Sonar.ui.tabBarHeight = 36;
	Sonar.ui.width = Ti.Platform.displayCaps.platformWidth;
	Sonar.ui.images = {
		selected: '/images/buttonbar/button2_selected.png',
		unselected: '/images/buttonbar/button2_unselected_shadow.png',
		unselectedLS: '/images/buttonbar/button2_unselected_shadowL.png',
		unselectedRS: '/images/buttonbar/button2_unselected_shadowR.png',
	};
	Sonar.ui.font = {fontSize: 14, fontWeight: 'bold'};
	
	Sonar.ui.createHeaderRow = function(title) {
		var headerRow = Ti.UI.createTableViewRow({
	    	classname: 'header_row',
	    	height:26,
	    	backgroundImage: '/pages/timebreak_gray@2x.png',
	    	selectedBackgroundImage:'/pages/timebreak_gray@2x.png',
	    	touchEnabled: false
	    });
	    var headerLabel = Ti.UI.createLabel({
	    	text: title,
	    	color: '#fff',
	    	font: {
	    		fontSize:16,
	    		fontWeight:'bold'	
	    	},
	    	left: 10,
	    	touchEnabled: false
	    });
	    headerRow.add(headerLabel);
	    
	    return headerRow;
	};
	
	Sonar.ui.CreatePickerView = function(wn, data, logEnabled, done, cancel) {
		/// <summary>Creates a slideup-ing View that holds a picker</summary>
		/// <param name="wn" type="Titanium.UI.Window">
		/// A reference to the Window to add this PickerView to
		/// </param>
		/// <param name="data" type="array of Titanium.UI.PickerRow">
		/// an array of data rows to add to the picker
		/// </param>
		/// <param name="logEnabled" type="boolean">
		/// Enabled logging inside this function
		/// </param>
		/// <param name="done" type="Function">
		/// The event to run when the user picks "done", function will be passed the Titanium.UI.PickerRow that they chose
		/// </param>
		/// <param name="cancel" type="Function">
		/// The event to run when the user picks "cancel", function will be passed the Titanium.UI.PickerRow that they chose
		/// </param>
		/// <param name="index" type="Function">
		/// Selected Row
		/// </param>
		/// <returns type="Titanium.UI.View" />
		var ThisControl = {
			"LogEnabled" : logEnabled,
			"Log" : function(txt) {
				if (ThisControl.LogEnabled) { Ti.API.info(txt); }
			}
		};
		ThisControl.Log("Inside 'Controls.CreatePickerView' - Start");

		// The container view, which will be hidden along the bottom
		ThisControl.View = Ti.UI.createView({
			height : 251,
			bottom : -251,
			zIndex: 100
		});
		
		// Show the view holding the picker
		ThisControl.ShowAnimation = Ti.UI.createAnimation({bottom:8});
		ThisControl.Show = function(index) {
			ThisControl.Picker.setSelectedRow(0,index);
			ThisControl.Log("Showing Picker");
			ThisControl.View.animate(ThisControl.ShowAnimation);
		};
		// Hide the view holding the picker
		ThisControl.HideAnimation = Ti.UI.createAnimation({bottom:-251});
		ThisControl.Hide = function() {
			ThisControl.Log("Hiding Picker");
			ThisControl.View.animate(ThisControl.HideAnimation);
		};
		ThisControl.Cancel = Ti.UI.createButton({
			title : 'Cancel',
			style : Ti.UI.iPhone.SystemButtonStyle.BORDERED
		});
		ThisControl.Done = Ti.UI.createButton({
			title : 'Done',
			style : Ti.UI.iPhone.SystemButtonStyle.DONE
		});
		ThisControl.Spacer = Ti.UI.createButton({
			systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		ThisControl.Toolbar = Ti.UI.iOS.createToolbar({
			top : 0,
			items : [ ThisControl.Cancel, ThisControl.Spacer, ThisControl.Done ]
		});
		ThisControl.Picker = Ti.UI.createPicker({
			top : 43
		});
		ThisControl.Picker.selectionIndicator = true;
		ThisControl.Done.addEventListener('click', function() {
			ThisControl.Log("Inside 'Controls.CreatePickerView' - Clicked 'Done'");
			ThisControl.Hide();
			done(ThisControl.Picker.getSelectedRow(0));
		});
		ThisControl.Cancel.addEventListener('click', function() {
			ThisControl.Log("Inside 'Controls.CreatePickerView' - Clicked 'Cancel'");
			ThisControl.Hide();
			cancel();
		});
		ThisControl.Picker.add(data);
		ThisControl.View.add(ThisControl.Toolbar);
		ThisControl.View.add(ThisControl.Picker);
		wn.add(ThisControl.View);

		ThisControl.Log("Inside 'Controls.CreatePickerView' - End");
		return ThisControl;
	};
})();