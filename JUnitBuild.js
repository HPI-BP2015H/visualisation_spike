import "xmlw3cdom.js";
import "xmlsax.js";

var JUnitBuild = function(id) {
  this.id = id;

  // Retrieve values via REST API.
  var commitTime    = getCommitTime();
  var committerName = getCommitterName();
  var status        = getStatus();

  // Retrieve and parse JUnitXML.
  var jUnitXML = getXML();
  var jParser  = new DOMParser();
  var jDOM     = jParser.parseFromString(jUnitXML, "text/xml");

  // Generate values from JUnitXML.
  var time          = getBuildTime(jDOM);
  var testcaseCount = getTestcaseCount(jDOM);
  var failCount     = getFailCount(jDOM);
  var passCount     = getPassCount(jDOM);
  var errorCount    = getErrorCount(jDOM);

  /*
   * TODO:
   * Implement substructure for suites and testcases.
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
    return "";
  }

  function getBuildTime(jDOM) {
    // TODO: Implement.
  }

  function getTestcaseCount(jDOM) {
    // TODO: Implement.
  }

  function getFailCount(jDOM) {
    // TODO: Implement.
  }

  function getPassCount(jDOM) {
    // TODO: Implement.
  }

  function getErrorCount(jDOM) {
    // TODO: Implement.
  }
}
