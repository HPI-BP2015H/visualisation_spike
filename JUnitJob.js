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
    var xml_testsuites_count = getRandomInt(1, 5);
    var xml_tests  = 0;
    var xml_fails  = 0;
    var xml_errors = 0;
    var xml_time   = 0;

    var xml_testsuites = [];

    for(var i = 0; i < xml_testsuites_count; i++) {
      // for each testsuite
      console.log("testsuite loop entered");
      var testsuite_tests   = getRandomInt(1, 25);
      var testsuite_fails   = 0;
      var testsuite_errors  = 0;
      var testsuite_skipped = 0;
      var testsuite_time    = 0;
      var testsuite_name    = 'testsuite_' + i.toString(Math.ceil(Math.log10(xml_testsuites_count)));

      var testsuite_testcases = [];

      for(var j = 0; j < testsuite_tests; j++) {
        // for each testcase
        console.log("testcase loop entered");
        var testcase_status    = getRandomInt(1, 5);
        var testcase_time      = getRandomInt(1, 100);
        var testcase_name      = 'test_'  + i.toString(Math.ceil(Math.log10(xml_testsuites_count))) + "_" + j.toString(Math.ceil(Math.log10(testsuites_tests)));
        var testcase_classname = 'class_' + i.toString(Math.ceil(Math.log10(xml_testsuites_count))) + "_" + j.toString(Math.ceil(Math.log10(testsuites_tests)));

        var testcase_head = '<testcase name="' + testcase_name + '" classname="' + testcase_classname + '" time="' + testcase_time.toString() + '">';
        var testcase_body = '';
        var testcase_foot = '</testcase>';

        switch(status) {
          case 1:
            // passed
            testcase_body = '';
            break;
          case 2:
            // failed
            testsuite_fails++;
            testcase_body = '<failure message="failure message">stack trace</failure>';
            break;
          case 3:
            // errored
            testsuite_errors++;
            testcase_body = '<error message="error message">crash report</error>';
            break;
          case 4:
            // skipped
            testsuite_skipped++;
            testcase_body = '<skipped />'
            break;
          default:
            // should not happen, but assume passed as default
            testcase_body = '';
            break;
        }
        testsuite_time += testcase_time;
        testsuite_testcases.push(testcase_head + testcase_body + testcase_foot);
      }
      xml_tests  += testsuite_tests;
      xml_fails  += testsuite_fails;
      xml_errors += testsuite_errors;
      xml_time   += testsuite_time;
      testsuite_head = '<testsuite name="' + testsuite_name + '" tests="' + testsuite_tests + '" failures="' + testsuite_fails + '" errors="' + testsuite_errors + '" time="' + testsuite_time + '">';
      testsuite_foot = '</testsuite>';
      xml_testsuites.push(testsuite_head + testsuite_testcases.join('') + testsuite_foot);
    }

    var mock_head = '<?xml version="1.0" encoding="UTF-8"?>';
    var xml_head  = '<testsuites tests="' + xml_tests + '" failures="' + xml_fails + '" errors="' + xml_errors + '" time="' + xml_time + '">';
    var xml_foot  = '</testsuites>';

    var mock = mock_head + xml_head + xml_testsuites.join('') + xml_foot;
    // var mock = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>';
    console.log(mock);
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
