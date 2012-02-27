function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

(function () {
	// CHEATING BY HARDCODING TYPES
	Sonar.ui.getActivityTypeDetails = function (activityType)
	{
		switch(activityType)
		{
		case 'f53df13a-8d0c-4bd0-ab66-b45b87b5d58a':
			return {description: 'Develop Account Plan',points: '1.0'}
		  	break;
		case 'f960b07c-b66f-4d87-ab22-20cd5eb145f0':
			return {description: 'Develop Sales or Pitch Deck',points: '1.0'}
			break;
	  	case 'b5c6180a-eea6-4434-9be8-aee3a3be033d':
			return {description: 'Research Company',points: '0.5'}
			break;
		case '0f976c0d-aae8-4e6a-a6f9-da5d037d208b':
			return {description: 'Attend Networking Event',points: '2.0'}
			break;
	  	case '796d8e69-f32f-4470-ac50-7f49de923712':
			return {description: 'Call or Email Contact',points: '0.2'}
			break;
		case '4d453acb-17b6-4d88-a373-f0c8b403dce3':
			return {description: 'Meet with Contact',points: '1.0'}
		  	break;
		case 'e370e35b-cc87-482b-90c7-201045c9164c':
			return {description: 'Speak or Publish',points: '3.0'}
		  	break;
	  	case 'a6b9c08a-bf44-4f04-aae2-b2fc852402c6':
			return {description: 'Completed Cold Call',points: '1.0'}
		  	break;
	  	case 'acc73f9a-b076-421b-abcd-5a82a50baa3c':
			return {description: 'Dialed Cold Call',points: '0.2'}
		  	break;
	  	case '02fc74ba-38f2-4e7b-b47a-340554d575dd':
			return {description: 'Follow-up on Lead',points: '0.5'}
		  	break;
	  	case 'a3d1e609-7ffb-4509-b7fa-ef2d87d9ada5':
			return {description: 'Make Informational Call',points: '0.5'}
		  	break;
	  	case '192d145a-31af-4767-8b1d-a5b8d1d004a7':
			return {description: 'Advance Relationships',points: '0.5'}
		  	break;
	  	case 'd0c8d228-50ba-4404-a2b2-844dd4d54966':
			return {description: 'Attend Executive Project Meetings',points: '0.5'}
		  	break;
	  	case '593fe387-d921-4014-91e3-55af0c4f690b':
			return {description: 'Build Client Network',points: '0.2'}
		  	break;
	  	case '7df68cfc-1e39-4859-91c3-4178d34fe7b5':
			return {description: 'Attend Executive Sales Meetings',points: '2.0'}
		  	break;
	  	case 'ab5ccc9c-4df3-4e32-a0e2-73625a695bb2':
			return {description: 'Attend First Sales Meeting',points: '1.0'}
		  	break;
	  	case '83c7fbf9-9de1-40de-bb8d-be4efb7005f3':
			return {description: 'Attend Follow-up Sales Meeting',points: '0.5'}
		  	break;
	  	case '9bfd1cd6-9ed0-4ec4-8021-96d39eaee89e':
			return {description: 'Develop Pre-Proposal',points: '2.0'}
		  	break;
	  	case 'bcb4a14e-ff55-4cea-b223-ea043872b74c':
			return {description: 'Develop Proposal',points: '2.0'}
		  	break;
		default:
		 	return {description: '',points: ''}
		}
		
	}
	
	//Activity Component Constructor
	Sonar.ui.createActivityTableView = function (data)
	{
		tableView = Ti.UI.createTableView({
			top: Sonar.ui.tabBarHeight,
	        height: '100%',
	        width: '100%',
			data: data
	    });
	    return tableView;
	}
	
	Sonar.ui.createActivityRow = function (contact,company,activityType,description){
		var activityRow = Ti.UI.createTableViewRow({
            hasChild: true,
            selectedColor: '#000',
            backgroundColor: '#fff',
            color: '#000',
            height: 64,
            focusable: true
        });
		
		var contactLabel = Ti.UI.createLabel({
            text: contact + ' - ' + company,
            font: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            color: '#1A6DA6',
            left: 10,
            top: 4,
            height: 20,
            width: '75%',
            touchEnabled: false
        });

        var activityLabel = Ti.UI.createLabel({
            text: Sonar.ui.getActivityTypeDetails(activityType).description,
            font: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            color: '#000',
            left: 10,
            top: 22,
            height: 20,
            width: '75%',
            touchEnabled: false
        });

        var descriptionLabel = Ti.UI.createLabel({
            text: description,
            font: {
                fontSize: 14,
                fontWeight: 'normal'
            },
            color: '#333',
            left: 10,
            top: 38,
            height: 20,
            width: '100%',
            touchEnabled: false
        });
        
        var pointLabel = Ti.UI.createLabel({
        	text: Sonar.ui.getActivityTypeDetails(activityType).points,
            font: {
                fontSize: 36,
                fontWeight: 'bold'
            },
            color: '#333',
			right: 10,
            top: 0,
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
            width: '20%',
            height: 'auto',
            touchEnabled: false
        })

        activityRow.add(contactLabel);
        activityRow.add(activityLabel);
        activityRow.add(descriptionLabel);
        activityRow.add(pointLabel);
		return activityRow;
	}
	
	
	Sonar.ui.getActivityEntryTableData = function (week,result){
		Ti.API.debug('**************************');
		
		var results = {}
		for(var i=0; i<result.length; i++) {
			var activityDate = new Date(parseInt((result[i].ActivityDate.split('/Date(')[1]).split('/')[0]));
			activityDate = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate());
				
			var activity = {
				company: result[i].Company,
				contact: result[i].Contact,
				description: result[i].Description,
				activityType: result[i].ActivityTypeId,
				activityDate: activityDate
			};
			if (results[activityDate]=== undefined)
			{
				results[activityDate] = [];
				results[activityDate].push(activity);	
			} else {
				results[activityDate].push(activity);	
			}
			
    	}
		
		Ti.API.info(results);
		Ti.API.debug('**************************');
		var data = [];
	
		for (var j=0;j<7;j++)
		{
			var day = new Date(week.minDate.getTime() + j*86400000);
			Ti.API.info(day.toString());
			
			data.push(Sonar.ui.createHeaderRow(Sonar.datetime.cleanFullDate(day)));
			
			if (results[day] !== undefined)
			{
				for (var k=0;k<results[day].length;k++)
				{
					data.push(new Sonar.ui.createActivityRow(results[day][k].contact,results[day][k].company,results[day][k].activityType,results[day][k].description));
				}
			}
		}
		return data;	
	}
	
    Sonar.ui.createActivityView = function (navController) {
    	var activityTimeout = 11000;
        var firstRun = true;
		var currentWeekIndex = 0;
	    var weeks = [
	    	{week: 1, label: "1/1/2012 - 1/7/2012", minDate:new Date(2012,0,1)},
	    	{week: 2, label: "1/8/2012 - 1/14/2012", minDate:new Date(2012,0,8)},
	    	{week: 3, label: "1/15/2012 - 1/21/2012", minDate:new Date(2012,0,15)}
	    ];
			
		//create activityWindow instance
		var activityWindow = Ti.UI.createWindow({
			title:'Activities',
			backgroundColor:'#fff',
	        barColor: '#414444',
	        fullscreen: false
		});
	
		if (!Sonar.isAndroid()){	
		//create week picker
		var WeekPicker = Sonar.ui.CreatePickerView(
	 		activityWindow,
			(function() {
				var data = [];
				for (var i=0;i<weeks.length;i++){
					data.push(Ti.UI.createPickerRow({ title: weeks[i].label, week:weeks[i].week}));
				}
				return data;	
			})(),
	 		true,
	 		function(row) {
	 			Ti.API.info("You picked: " + row.title + "/" + row.week);
	        	prevButton.backgroundImage = Sonar.ui.images.unselected;
				weekViewButton.backgroundImage = Sonar.ui.images.unselected;
	        	nextButton.backgroundImage = Sonar.ui.images.unselected;
	        	
	        	var i=0;
	        	for (i;i<weeks.length;i++)
	        	{
	        		if (row.week === weeks[i].week) break;
	        	}
	        	if (currentWeekIndex !== i) {
	        		currentWeekIndex = i;				
					weekViewButtonLabel.text = weeks[currentWeekIndex].label;

					reloadActivityData();
	        	}
	 		},
	 		function() {
	 			prevButton.backgroundImage = Sonar.ui.images.unselected;
	    		weekViewButton.backgroundImage = Sonar.ui.images.unselected;
	        	nextButton.backgroundImage = Sonar.ui.images.unselected;
	 		}
	 	);
	
		}
		
		// Start creating the week toolbar
	    var weekToolbar = Ti.UI.createView({
	        top: 0,
	        backgroundColor: '#000',
	        height: Sonar.ui.tabBarHeight,
	        width: Sonar.ui.width
	    });
	    prevButton = Ti.UI.createView({
	    	backgroundImage: Sonar.ui.images.unselected,
	        height: Sonar.ui.tabBarHeight,
	        left: 0,
	        right: Sonar.ui.width - (Sonar.ui.width / 5),
	        index: 0	
	    });
	    weekViewButton = Ti.UI.createView({
	    	backgroundImage: Sonar.ui.images.unselected,
	        height: Sonar.ui.tabBarHeight,
	        left: Sonar.ui.width / 5,
	        right: Sonar.ui.width / 5,
	        index: 1	
	    });
	    nextButton = Ti.UI.createView({
		    backgroundImage: Sonar.ui.images.unselected,
	        height: Sonar.ui.tabBarHeight,
	        left: 4 * (Sonar.ui.width / 5),
	        right: 0,
	        index: 2
	    });
	    prevButtonLabel = Ti.UI.createLabel({
	        text: '<',
	        textAlign: 'center',
	        color: '#fff',
	        height: 'auto',
	        touchEnabled: false,
	        font: Sonar.ui.font
	    });
	    weekViewButtonLabel = Ti.UI.createLabel({
	        text: weeks[currentWeekIndex].label,
	        textAlign: 'center',
	        color: '#fff',
	        height: 'auto',
	        touchEnabled: false,
	        font: Sonar.ui.font
	    });
	    nextButtonLabel = Ti.UI.createLabel({
	        text: '>',
	        textAlign: 'center',
	        color: '#fff',
	        height: 'auto',
	        touchEnabled: false,
	        font: Sonar.ui.font
	    });
	    
	    prevButton.addEventListener('click', function (e){
	    	Ti.API.info("clicked previous");
	    	if (currentWeekIndex > 0) {	
	    		currentWeekIndex--;
				weekViewButtonLabel.text = weeks[currentWeekIndex].label;
				reloadActivityData();
	    	}
	    });
	    
		weekViewButton.addEventListener('click', function (e) {
		    prevButton.backgroundImage = Sonar.ui.images.unselectedRS;
	    	weekViewButton.backgroundImage = Sonar.ui.images.selected;
	        nextButton.backgroundImage = Sonar.ui.images.unselectedLS;
			
			if (!Sonar.isAndroid()){
				WeekPicker.Show(currentWeekIndex);
			}
	    });
	    nextButton.addEventListener('click', function (e){		
	    	Ti.API.info("clicked next");
	    	if (currentWeekIndex < weeks.length-1) {
	    		currentWeekIndex++;
				weekViewButtonLabel.text = weeks[currentWeekIndex].label;
				reloadActivityData();
	    	}
	    	
	    });
	    nextButton.addEventListener('touchend', function (e){
	    	prevButton.backgroundImage = Sonar.ui.images.unselected;
	    	weekViewButton.backgroundImage = Sonar.ui.images.unselected;
	        nextButton.backgroundImage = Sonar.ui.images.unselected;
	    });
	
	    
		// layout the tabbed scrollableview
	    prevButton.add(prevButtonLabel);
	    weekToolbar.add(prevButton);
	    weekViewButton.add(weekViewButtonLabel);
	    weekToolbar.add(weekViewButton);
	    nextButton.add(nextButtonLabel);
	    weekToolbar.add(nextButton);
	    
		var container = Ti.UI.createView();		    
	    var currentActivityTableView = Ti.UI.createView();
	    
	    container.add(currentActivityTableView);
		activityWindow.add(container);
		activityWindow.add(weekToolbar);
		Ti.API.addEventListener('odata_collections_loaded', function(result) {
		    var data = Sonar.ui.getActivityEntryTableData(weeks[currentWeekIndex],result.result);
	    
			var oldActivityTableView = currentActivityTableView;
			currentActivityTableView = new Sonar.ui.createActivityTableView(data);
			container.add(currentActivityTableView);
			Sonar.ui.activityIndicator.hideModal();			
			

			container.remove(oldActivityTableView);
			oldActivityTableView = null;				    
		});
		
		reloadActivityData = function () {
			Sonar.ui.activityIndicator.showModal('Fetching activities...', activityTimeout, 'SONAR timed out. Activities may not have been updated.');
		    
		    var ODataHelper = require('odata/ODataHelper').ODataHelper;
			
			var minDate = weeks[currentWeekIndex].minDate;
			var maxDate = new Date(weeks[currentWeekIndex].minDate.getTime() + 6*86400000);
			
			Ti.API.info('Fetching data for: ' + Sonar.datetime.isoDate(minDate) + ' to ' + Sonar.datetime.isoDate(maxDate));
			
			var odata = new ODataHelper("https://services.parivedasolutions.com/sonardev/DataService/Activities()?$filter=(ActivityDate ge datetime'"+Sonar.datetime.isoDate(minDate)+"') and (ActivityDate le datetime'"+Sonar.datetime.isoDate(maxDate)+"')");
			odata.getCollections();
		}
		
		
		if (Ti.Network.online) {
			activityWindow.addEventListener('open', function (e) {
            	if (firstRun) {
                	firstRun = false;
              		reloadActivityData();
				}
			});
	 		if (Sonar.isAndroid()) {
                // activityWindow.activity.onCreateOptionsMenu = function (e) {
                    // var testmenuitem = e.menu.add({
                    	// title: 'Test'
                    // });
                    // testmenuitem.addEventListener('click', function (e) {
						// navController.open(new Sonar.ui.createTestWindow(navController));
                    // });
                    // var menuitem = e.menu.add({
                        // title: 'Refresh'
                    // });
                    // menuitem.addEventListener('click', function (e) {
                  		// reloadActivityData();
                    // });
                //};
            } else {
			   	var add = Ti.UI.createButton({
					title:'Test'
				});
				add.addEventListener('click', function() {
					navController.open(new Sonar.ui.createTestWindow(navController));
				});
            	
                var button = Ti.UI.createButton({
                    systemButton: Ti.UI.iPhone.SystemButton.REFRESH
                });
                button.addEventListener('click', function (e) {
					reloadActivityData();
                });
                activityWindow.leftNavButton = add;
                activityWindow.rightNavButton = button;
            }
        } else {
            alert('No network connection detected.');
        }
	
		return activityWindow;
	}
})();