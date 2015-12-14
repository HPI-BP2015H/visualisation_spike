var JUnitChartBuilder = function(slug) {

  var self=this;

  this.repo = new JUnitRepository(slug , generateCharts);


  function generateCharts() {
		console.log("generateCharts");
    var mockXMLs = [
      '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>',
      '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="2" failures="1" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>'
    ];
    var stackedAreaData = [
      ["Build", "Error", "Fail", "Pass"]
    ];

    var mockParser = new DOMParser();

    for (var i = 0; i < mockXMLs.length; i++) {
      var mockDOM = mockParser.parseFromString(mockXMLs[i], "text/xml");
      var tests = parseInt(mockDOM.documentElement.getAttribute("tests"));
      var fails = parseInt(mockDOM.documentElement.getAttribute("failures"));
      var errors = parseInt(mockDOM.documentElement.getAttribute("errors"));
      var passes = tests - fails;
      stackedAreaData.push([(i + 1).toString(), errors, fails, passes]);
    }

    google.load("visualization", "1.0", {packages: ["corechart"], callback: function() {
      generateStackedAreaChart(stackedAreaData);
      generateBubbleChart();
		  generatePieChart1();
    }});
  }


  function generateStackedAreaChart(dataArray) {
    console.log("tyrsyrysryrdsytd");
    // Just a mock-up right now.


			console.log("----------------------------------------------------------------------");
      var container = document.getElementById('stackedAreaChart');
      var chart = new google.visualization.AreaChart(container);
      /*var data = google.visualization.arrayToDataTable([
			["Build", "Error", "Fail", "Pass"],
			[    "1",       5,      7,     83],
			[    "2",       5,      8,     82],
			[    "3",       8,      0,     90],
			[    "4",      10,     15,     90],
			[    "5",       2,      7,     98]
		]);*/
      var data = new google.visualization.arrayToDataTable(dataArray);
      var options = {
        isStacked: true,
        height: 400,
        legend: {
          position: "top"
        },
        hAxis: {
          title: "Builds"
        },
        vAxis: {
          title: "Tests",
          minValue: 0
        },
        series: [{
          color: 'red',
          visibleInLegend: true
        }, {
          color: 'yellow',
          visibleInLegend: true
        }, {
          color: 'green',
          visibleInLegend: true
        }]
      };
      chart.draw(data, options);

  }

  function generateBubbleChart() {


      /*var data = google.visualization.arrayToDataTable([
		['ID',    'time', 'Weekday', 'numberOfCommits',     'commitID'],
	]);*/
      var data = google.visualization.arrayToDataTable(getAllCommitsWithDate());

      var options = {
        title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Weekday'
        },
        bubble: {
          textStyle: {
            fontSize: 11
          }
        },
        colorAxis: {
          colors: ['green', 'red']
        }
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }



	function getAllCommitsWithDate() { //for all branches
		console.log('[AAAAAAAAaaAaAAAaaaaaaaaaaaAaAaAaAaAaAaAaAaAaAaAaAaAAAAAAAaaaaAaAaaAaAaAaAaAaAaAaAaA');

	  var builds = [];
		for (var i = 0; i < self.repo.branches.length; i++) {
			for (var j = 0; j < self.repo.branches[i].builds.length; j++) {
				builds.push(self.repo.branches[i].builds[j])
			}
		}

	  var array = [
	    ['ID', 'Time', 'Weekday', 'numberOfFailures', 'numberofCommits']
	  ];
	  var weekday = null;
	  var time = null;
	  var isFailure = null;
	  for (var i = 0; i < builds.length; i++) {
	    time = dateToHalfHours(builds[i].commitTime);
	    weekday = builds[i].commitTime.getDay();
	    isFailure = buildStateToBool(builds[i].state);
	    var n = dateAlreadyInArray(array, time, weekday);
	    if (n) {
	      array[n][4] += 1;
	      if (isFailure) {
	        array[n][3] += 1;
	      };
	    } else {
	      a = [''];
	      a.push(time)
	      a.push(weekday);
	      if (isFailure) {
	        a.push(1);
	      } else {
	        a.push(0);
	      }
	      a.push(1);
	      array.push(a);
	    }
	  }
	  return array;
	};

	function generatePieChart1(){

			var data = [['Branch', 'Health']];

			for(var i=0;i<self.repo.branches.length;i++){
				var passes=0;
				for(var j=0; j<self.repo.branches[i].builds.length; j++){
					if(self.repo.branches[i].builds[j].status=="passed"){
						passes=passes+100;
					}
				}
				var health=(passes)/(self.repo.branches[i].builds.length);
				data.push([self.repo.branches[i].name,health])
			}

			var options = {
          title: 'Branch Health'
        };

			var chart = new google.visualization.PieChart(document.getElementById('pieChart1'));
      chart.draw(google.visualization.arrayToDataTable(data),options);

	}

}
