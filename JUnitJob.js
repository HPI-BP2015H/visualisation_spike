var JUnitJob = function(id) {

  //variables

  this.id = id;

  // init

  loadStatus(this);
  this.log    = getLog(this.id);

  // Retrieve and parse JUnitXML.
  var jUnitXML = getXML(this.log);
  var jParser  = new DOMParser();
  var jDOM     = jParser.parseFromString(jUnitXML, "text/xml");

  // Generate values from JUnitXML.
  this.os            = getOS(this.log);
  this.env           = getEnv(this.log);
  this.time          = getJobTime(jDOM);
  this.testcaseCount = getTestcaseCount(jDOM);
  this.failCount     = getFailCount(jDOM);
  this.passCount     = getPassCount(jDOM);
  this.errorCount    = getErrorCount(jDOM);

  function loadStatus(job) {
    var apiPath = "https://api.travis-ci.org/v3/job/" + job.id.toString();
    getResultFromTravisAPI(apiPath, function(data) {
      job.status = data.state;
    });
  }

  function getLog(id) {
    $.ajaxSetup({async: false});
    var log = "";
    jQuery.get(
      "https://s3.amazonaws.com/archive.travis-ci.org/jobs/" + id.toString() + "/log.txt",
      function(data) {
        log = data;
      },
      'text'
    );
    return log;
  }

  function getOS(log) {
    var osKey = log.split("\n")[0].split(" ")[2].split("-")[1];
    if(osKey == "linux"  ) { return "linux"; }
    if(osKey == "jupiter") { return "osx";   }
    return "na";
  }

  function getEnv(log) {
    var lines = log.split("\n");
    var startMarker = "Setting environment variables from .travis.yml";
    var startLine = -1;

    for(var i = 0; i < lines.length; i++) {
      if(lines[i].indexOf(startMarker) > -1) {
        startLine = i;
        break;
      }
    }

    var env = {}
    var i = startLine + 1;

    while(lines[i] != 0) {
      var pair = lines[i].split(" ")[2].split("=");
      env[pair[0]] = pair[1];
      i++;
    }

    return env;
  }

  function getJobTime(jDOM) {
    return parseFloat(jDOM.documentElement.getAttribute("time"));
  }

  function getTestcaseCount(jDOM) {
    return parseFloat(jDOM.documentElement.getAttribute("tests"));
  }

  function getFailCount(jDOM) {
    return parseFloat(jDOM.documentElement.getAttribute("failures"));
  }

  function getPassCount(jDOM) {
    return (getTestcaseCount(jDOM) - getFailCount(jDOM));
  }

  function getErrorCount(jDOM) {
    return parseFloat(jDOM.documentElement.getAttribute("errors"));
  }

  function getXML(log) {
    // TODO: Find XML in log and return it.
    var mock = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>';
    return mock;
  }
}

function jUnitJobTest() {
  var testJob = new JUnitJob(94661534);
  console.log(testJob);
}
