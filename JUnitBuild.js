import "xmlw3cdom.js";
import "xmlsax.js";

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

  this.getCommitTime = function() {
    // TODO: Implement.
    return new Date(0);
  }

  this.getCommitterName = function() {
    // TODO: Implement.
    return "Max Mustermann";
  }

  this.getStatus = function() {
    // TODO: Implement.
    return "green"; // Maybe use boolean instead?
  }

  this.getXML = function() {
    // TODO: Implement.
    // 1. get log
    // 2. extract xml from log
    // (or mock xml first)
    return "";
  }

  this.getBuildTime = function(jDOM) {
    // TODO: Implement.
  }

  this.getTestcaseCount = function(jDOM) {
    // TODO: Implement.
  }

  this.getFailCount = function(jDOM) {
    // TODO: Implement.
  }

  this.getPassCount = function(jDOM) {
    // TODO: Implement.
  }

  this.getErrorCount = function(jDOM) {
    // TODO: Implement.
  }
}
