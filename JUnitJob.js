var JUnitJob = function(id, callback) {
  var self = this;

  // variables
  this.testsuites     = [];
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
  var doneCount       = 0;

  // init
  loadStatus();
  loadLog();

  // private
  function loadStatus() {
    var apiPath = "https://api.travis-ci.org/v3/job/" + self.id.toString();
    getResultFromTravisAPI(apiPath, function(data) {
      if(data != undefined) {
        self.status = data.state;
      }
      doneCount++;
      if(doneCount >= 2) {
          callback();
      }
    });
  }

  function loadLog() {
    var apiPath = "https://s3.amazonaws.com/archive.travis-ci.org/jobs/" + self.id.toString() + "/log.txt";
    getResultViaAjax(apiPath, function(data) {

      if(data != undefined) {
        self.log = data;
        self.os            = getOS();
        self.env           = getEnv();
        var parser = new DOMParser();
        jUnitDOM   = parser.parseFromString(getXML(), "text/xml");
        createTestsuites();
      }

      doneCount++;
      if(doneCount >= 2) {
          callback();
      }
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

  function getXML() {
    // TODO: Find XML in log and return it.
    var mock = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>';
    return mock;
  }

  function createTestsuites() {
    var jUnitTestsuites = jUnitDOM.getElementsByTagName("testsuite");
    for(var i = 0; i < jUnitTestsuites.length; i++) {
      var newSuite=new JUnitTestSuite(jUnitTestsuites[i]);
      self.testsuites.push(newSuite);

      self.time           +=newSuite.time;
      self.testcaseCount  +=newSuite.testcaseCount;
      self.failCount      +=newSuite.failCount;
      self.passCount      +=newSuite.passCount;
      self.errorCount     +=newSuite.errorCount;
    }
  }
}
