 var JUnitBuild = function(travisBuildObject, slug, callback) {
  var self = this;

  // variables
  this.id = travisBuildObject.id;
  this.slug = slug;
  this.jobs = getJobs();

  //just a fix. later in the values below will be aquired through this.jobs
  var jDOM = 0;


  function getJobs() {
    var j = [];
    var doneCount=0;
    for (var i = 0; i < travisBuildObject.jobs.length; i++) {
      j.push(new JUnitJob(travisBuildObject.jobs[i].id, function(){
        doneCount++;
        if (doneCount == travisBuildObject.jobs.length) {
          // Retrieve values via REST API.
          self.commitTime = getCommitTime();
          self.committerName = getCommitterName();
          self.status = getStatus();

          // Aggregate values from JUnitJobs.
          self.time = getBuildTime();
          self.testcaseCount = getTestcaseCount();
          self.failCount = getFailCount();
          self.passCount = getPassCount();
          self.errorCount = getErrorCount();

          callback();
        }
      }));
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
    var result = 0;
    for(var i = 0; i < self.jobs.length; i++) {
      result += self.jobs[i].time;
    }
    return result;
  }

  function getTestcaseCount() {
    var result = 0;
    for(var i = 0; i < self.jobs.length; i++) {
      result += self.jobs[i].testcaseCount;
    }
    return result;
  }

  function getFailCount() {
    var result = 0;
    for(var i = 0; i < self.jobs.length; i++) {
      result += self.jobs[i].failCount;
    }
    return result;
  }

  function getPassCount() {
    var result = 0;
    for(var i = 0; i < self.jobs.length; i++) {
      result += self.jobs[i].passCount;
    }
    return result;
  }

  function getErrorCount() {
    var result = 0;
    for(var i = 0; i < self.jobs.length; i++) {
      result += self.jobs[i].errorCount;
    }
    return result;
  }
}
