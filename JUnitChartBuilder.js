var JUnitChartBuilder = function(slug) {
  console.log('[START] Create ChartBuilder');
  this.repo = new JUnitRepository(slug);
  generateCharts();

  function generateCharts() {
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

    generateStackedAreaChart(stackedAreaData);
    generateBubbleChart();
  }

  function generateStackedAreaChart(dataArray) {
    // Just a mock-up right now.
    google.load("visualization", "1.0", {
      packages: ["corechart"]
    });
    google.setOnLoadCallback(function() {
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
    });
  }

  function generateBubbleChart() {
    google.load("visualization", "1", {
      packages: ["corechart"]
    });
    google.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

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
  }

  function printXML(builds) {
    for (var i = 0; i < builds.length; i++) {
      for (var j = 0; j < builds[i].jobs.length; j++) {
        var target = "https://api.travis-ci.org/jobs/" + builds[i].jobs[j].id + "/log.txt?deansi=true";
        jQuery.get(
          target,
          function(data) {
            console.log("[DONE] get logs");
            document.getElementsByTagName("body")[0].innerHTML += "JOB:<br/><br/>\n";
            document.getElementsByTagName("body")[0].innerHTML += data;
            document.getElementsByTagName("body")[0].innerHTML += "<br/><br/><br/>\n";
          },
          'text'
        );
      }
    }
  }
}
