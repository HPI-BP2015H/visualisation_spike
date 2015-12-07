var JUnitBuild = function(id) {
  this.id = id;

  // Retrieve values via REST API.
  var commitTime = getCommitTime();
  var committerName = getCommitterName();
  var status = getStatus();

  // Retrieve and parse JUnitXML.
  var jUnitXML = getXML();
  var jParser = new DOMParser();
  var jDOM = jParser.parseFromString(jUnitXML, "text/xml");

  // Generate values from JUnitXML.
  var time = getBuildTime(jDOM);
  var testcaseCount = getTestcaseCount(jDOM);
  var failCount = getFailureCount(jDOM);
  var passCount = getFailureCount(jDOM);
  var errorCount = getFailureCount(jDOM);

  /*
   * TODO:
   * Implement substructure for suites and testcases.
   */

   
}
