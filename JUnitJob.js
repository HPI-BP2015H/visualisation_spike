var JUnitJob = function(id, callback) {
  var self = this;

  // variables
  this.id             = id;
  this.status         = "";
  this.log            = "";
  this.os             = "";
  this.env            = "";
  this.time           = 0;
  this.testcaseCount  = 0;
  this.failCount      = 0;
  this.passCount      = 0;
  this.errorCount     = 0;

  var jUnitDOM        = "";

  // init
  loadStatus();
  loadLog();

  // private
  function loadStatus() {
    var apiPath = "https://api.travis-ci.org/v3/job/" + self.id.toString();
    getResultFromTravisAPI(apiPath, function(data) {
      self.status = data.state;
      callback();
    });
  }

  function loadLog() {
    var apiPath = "https://s3.amazonaws.com/archive.travis-ci.org/jobs/" + self.id.toString() + "/log.txt";
    getResultViaAjax(apiPath, function(data) {

      self.log = data;

      this.os            = getOS();
      this.env           = getEnv();

      var parser = new DOMParser();
      jUnitDOM   = parser.parseFromString(getXML, "text/xml");

      this.time          = getJobTime();
      this.testcaseCount = getTestcaseCount();
      this.failCount     = getFailCount();
      this.passCount     = getPassCount();
      this.errorCount    = getErrorCount();

    }, "text", {});
  }

  function getOS() {
    var osKey = self.log.split("\n")[0].split(" ")[2].split("-")[1];
    if(osKey == "linux"  ) { return "linux"; }
    if(osKey == "jupiter") { return "osx";   }
    return "na";
  }

  function getEnv() {
    var lines = self.log.split("\n");
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

  function getJobTime() {
    return parseFloat(jUnitDOM.documentElement.getAttribute("time"));
  }

  function getTestcaseCount() {
    return parseFloat(jUnitDOM.documentElement.getAttribute("tests"));
  }

  function getFailCount() {
    return parseFloat(jUnitDOM.documentElement.getAttribute("failures"));
  }

  function getPassCount() {
    return (getTestcaseCount(jUnitDOM) - getFailCount(jUnitDOM));
  }

  function getErrorCount() {
    return parseFloat(jUnitDOM.documentElement.getAttribute("errors"));
  }

  function getXML() {
    // TODO: Find XML in log and return it.
    var mock = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>';
    return mock;
  }

}
