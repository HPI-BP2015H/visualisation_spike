function generateCharts() {
  var mockXML = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>'
  var mockParser = new DOMParser();
  var mockDOM = mockParser.parseFromString(mockXML, "text/xml");
  console.log(mockDOM.documentElement.nodeName);

  generateStackedAreaChart();
}

function generateStackedAreaChart() {
  // Just a mock-up right now.
  google.load("visualization", "1.0", {packages:["corechart"]});
  google.setOnLoadCallback(function() {
    var container = document.getElementById('stackedAreaChart');
    var chart = new google.visualization.AreaChart(container);
    var data = google.visualization.arrayToDataTable([
      ["Build", "Fail", "Pass"],
      [    "1",      7,     83],
      [    "2",      8,     82],
      [    "3",      0,     90],
      [    "4",     15,     90],
      [    "5",      7,     98]
    ]);
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
      series: [
        {color: 'red', visibleInLegend: true},
        {color: 'green', visibleInLegend: true}
      ]
    };
    chart.draw(data, options);
  });
}

function printXML() {
  $.ajaxSetup({async: true});
  var slug = "HPI-BP2015H%2FSWT-Demo"

  // get builds
  jQuery.ajax({
    type: "GET",
    headers: {
      "Travis-API-Version":"3"
    },
    dataType: "json",
    url: "https://api.travis-ci.org/v3/repo/" + slug + "/builds",
    success: function (data, status, jqXHR) {
      console.log("[DONE] get builds");
      processBuilds(data.builds);
    },
    error: function (jqXHR, status) {
      console.log("[FAILED] get builds");
      console.log(jqXHR);
      console.log(status);
    }
  });
}

function processBuilds(builds) {
  for(var i = 0; i < builds.length; i++) {
    for(var j = 0; j < builds[i].jobs.length; j++) {
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
