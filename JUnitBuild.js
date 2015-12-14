 
var JUnitBuild = function(travisBuildObject, slug) {
  var self=this;

  this.id = travisBuildObject.id;
  this.slug = slug;
  this.jobs = getJobs();

  // Retrieve values via REST API.
  this.commitTime = getCommitTime();
  this.committerName = getCommitterName();
  this.status = getStatus();

  //just a fix. later in the values below will be aquired through this.jobs
  var jDOM = 0;
  // Aggregate values from JUnitJobs.
  this.time = getBuildTime();
  this.testcaseCount = getTestcaseCount();
  this.failCount = getFailCount();
  this.passCount = getPassCount();
  this.errorCount = getErrorCount();

  function getJobs() {
    var j = [];
    for (var i = 0; i < travisBuildObject.jobs.length; i++) {
      j.push(new JUnitJob(travisBuildObject.jobs[i].id));
    }
    return j;
  }

  function getCommitTime() {
    return new Date(travisBuildObject.commit.committed_at);
  }

  function getCommitterName() {
    var apiPath = "https://api.github.com/repos/" + githubCompatibleSlug(this.slug) + "/commits/" + travisBuildObject.commit.sha;
    var res = getResultFromGithubAPI(apiPath);
    if (res) {
      return res.commit.committer.name;
    } else {
      return "Max Mustermann";
    }
  }

  function getStatus() {
    return travisBuildObject.state;
  }

  function getBuildTime() {
    // TODO: Implement.
    return 0;
  }

  function getTestcaseCount() {
    // TODO: Implement.
    return 0;
  }

  function getFailCount() {
    // TODO: Implement.
    return 0;
  }

  function getPassCount() {
    // TODO: Implement.
    return 0;
  }

  function getErrorCount() {
    // TODO: Implement.
    return 0;
  }
}
