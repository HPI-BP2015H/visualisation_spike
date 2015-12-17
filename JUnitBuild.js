 var JUnitBuild = function(travisBuildObject, slug, callback) {
  var self = this;

  // variables
  this.id = travisBuildObject.id;
  this.slug = slug;
  this.jobs = [];
  this.status = getStatus();
  this.commitTime = getCommitTime();
  this.time = 0;
  this.testcaseCount = 0;
  this.failCount = 0;
  this.passCount = 0;
  this.errorCount = 0;

  var doneCount = 0;

  // init
  loadCommitterName();
  loadJobs();

  // private
  function getStatus() {
    return travisBuildObject.state;
  }

  function getCommitTime() {
    return new Date(travisBuildObject.commit.committed_at);
  }

  function loadCommitterName() {
    var apiPath = "https://api.github.com/repos/" + githubCompatibleSlug(self.slug) + "/commits/" + travisBuildObject.commit.sha;
    getResultFromGithubAPI(apiPath, function(data) {
      if(data != undefined) {
        self.committerName = data.commit.committer.name;
      }
      doneCount++;
      if (doneCount == 2) {
        callback();
      }
    });
  }

  function loadJobs() {
    var loadedJobs = 0;
    for (var i = 0; i < travisBuildObject.jobs.length; i++) {
      self.jobs.push(new JUnitJob(travisBuildObject.jobs[i].id, function() {
        loadedJobs++;
        if (loadedJobs == travisBuildObject.jobs.length) {
          aggregateJobData();
          doneCount++;
          if (doneCount == 2) {
            callback();
          }
        }
      }));
    }
  }

  function aggregateJobData() {
    for(var i = 0; i < self.jobs.length; i++) {
      self.time += self.jobs[i].time;
      self.testcaseCount += self.jobs[i].testcaseCount;
      self.failCount += self.jobs[i].failCount;
      self.passCount += self.jobs[i].passCount;
      self.errorCount+= self.jobs[i].errorCount;
    }
  }

}
