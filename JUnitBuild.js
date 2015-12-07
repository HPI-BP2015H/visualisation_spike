var JUnitBuild = function(id) {
  this.id = id;

  this.jobs = getJobs();

  // Retrieve values via REST API.
  this.commitTime    = getCommitTime();
  this.committerName = getCommitterName();
  this.status        = getStatus();

  // Aggregate values from JUnitJobs.
  this.time          = getBuildTime(jDOM);
  this.testcaseCount = getTestcaseCount(jDOM);
  this.failCount     = getFailCount(jDOM);
  this.passCount     = getPassCount(jDOM);
  this.errorCount    = getErrorCount(jDOM);

  function getJobs() {
    // TODO: Implement.
    return [];
  }

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
