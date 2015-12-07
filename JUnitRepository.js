var JUnitRepository = function(slug) {
  this.slug = slug;
  this.branches = [];
  this.allBuilds = getAllBuilds();
  getBranches();


  function getBranches() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/branches";
    var result = getResultFromAPIPath(apiPath).branches;
    for each (branch in result) {
      var branchBuilds = getBuildsForBranch(branch.name);
      this.branches.push(new JUnitBranch(branch, branchBuilds, this.slug));
    }
  }

  function getAllBuilds() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/builds";
    return getResultFromAPIPath(apiPath).builds;
  }

  function getBuildsForBranch(aBranchName) {
    var b = [];
    for each (build in this.allBuilds) {
      if (build.branch.name == aBranchName) {
        b.push(build);
      }
    }
    return b;
  }
}
