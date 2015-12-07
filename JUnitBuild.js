var JUnitBuild = function(travisBuildObject, slug) {
  this.id = travisBuildObject.id;
  this.slug = slug;
  this.jobs = getJobs();
  console.log(travisBuildObject);

  // Retrieve values via REST API.
  this.commitTime    = getCommitTime();
  this.committerName = "Max M.";//getCommitterName();
  this.status        = getStatus();

  // Aggregate values from JUnitJobs.
  this.time          = getBuildTime(jDOM);
  this.testcaseCount = getTestcaseCount(jDOM);
  this.failCount     = getFailCount(jDOM);
  this.passCount     = getPassCount(jDOM);
  this.errorCount    = getErrorCount(jDOM);

  function getJobs() {
    var j = [];
    for (var i = 0; i < travisBuildObject.jobs.length; i++) {
      j.push(new JUnitJob(travisBuildObject.jobs[i].id)
    }
    return j;
  }

  function getCommitTime() {
      return new Date(travisBuildObject.commit.committed_at);
  }

  function getCommitterName() {
    var apiPath = "https://api.github.com/repos/"+ githubCompatibleSlug(this.slug) + "/commits/" + travisBuildObject.commit.sha;
    var name = getResultFromGithubAPI(apiPath).commit.committer.name;
    if (name) {
      return name;
    } else {
      return "Max Mustermann";
    }
  }

  function getStatus() {
    return travisBuildObject.state
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
