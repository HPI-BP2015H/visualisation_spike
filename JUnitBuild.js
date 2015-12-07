var JUnitBuild = function(id) {
  this.id = id;

  // Retrieve values via REST API.
  this.commitTime    = getCommitTime();
  this.committerName = getCommitterName();
  this.status        = getStatus();

  // Retrieve and parse JUnitXML.
  var jUnitXML = getXML();
  var jParser  = new DOMParser();
  var jDOM     = jParser.parseFromString(jUnitXML, "text/xml");

  // Generate values from JUnitXML.
  this.time          = getBuildTime(jDOM);
  this.testcaseCount = getTestcaseCount(jDOM);
  this.failCount     = getFailCount(jDOM);
  this.passCount     = getPassCount(jDOM);
  this.errorCount    = getErrorCount(jDOM);

  /*
   * TODO:
   * Implement substructure for jobs, suites, (<-- oxford comma) and testcases.
   */

  function getCommitTime() {
    // TODO: Implement.
    return new Date(0);
  }

  function getCommitterName() {
    // TODO: Implement.
    return "Max Mustermann";
  }

  function getStatus() {
    // TODO: Implement.
    return "green"; // Maybe use boolean instead?
  }

  function getXML() {
    // TODO: Implement.
    // 1. get log
    // 2. extract xml from log
    // (or mock xml first)
    var mock = '<?xml version="1.0" encoding="UTF-8"?><testsuite name="#(\'BaselineOfSWTDemo\') Test Suite" tests="1" failures="0" errors="2" time="0.0"><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testAnotherValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testAnotherValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><testcase classname="SWTDemo.Tests.SWTDemoTest" name="testValue" time="0.0"><error type="TestFailure" message="Assertion failed">SWTDemoTest(TestCase)>>signalFailure:\nSWTDemoTest(TestCase)>>assert:\nSWTDemoTest>>testValue\nSWTDemoTest(TestCase)>>performTest\n</error></testcase><system-out><![CDATA[]]></system-out><system-err><![CDATA[]]></system-err></testsuite>';
    return mock;
  }

  function getBuildTime(jDOM) {
    // TODO: Implement.
    return 0;
  }

  function getTestcaseCount(jDOM) {
    // TODO: Implement.
    return 0;
  }

  function getFailCount(jDOM) {
    // TODO: Implement.
    return 0;
  }

  function getPassCount(jDOM) {
    // TODO: Implement.
    return 0;
  }

  function getErrorCount(jDOM) {
    // TODO: Implement.
    return 0;
  }
}

function jUnitBuildTest() {
  var testBuild = new JUnitBuild(94661528);
  console.log(testBuild);
}
