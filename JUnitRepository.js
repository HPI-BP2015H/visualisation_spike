var JUnitRepository = function(slug) {
  //methods

  this.getBranches = function() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/branches";
    var result = getResultFromAPIPath(apiPath).branches;
    for (var i = 0; i < result.length; i++) {
      var branchBuilds = this.getBuildsForBranch(result[i].name);
      this.branches.push(new JUnitBranch(result[i], branchBuilds, this.slug));
    }
  }

  this.getBuildsForBranch = function(aBranchName) {
    var b = [];
    for (var i = 0; i < this.allBuilds.length; i++) {
      if (this.allBuilds[i].branch.name == aBranchName) {
        b.push(this.allBuilds[i]);
      }
    }
    return b;
  }

  //variables

  this.slug = slug;
  this.branches = [];
  this.allBuilds = getAllBuilds();
  this.getBranches();
  console.log("BRANCHES:");
  console.log(this.branches);

  //private

  function getAllBuilds() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/builds";
    return getResultFromAPIPath(apiPath).builds;
  }


}
