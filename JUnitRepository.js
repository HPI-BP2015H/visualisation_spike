var JUnitRepository = function(slug) {
  //methods

  this.getBranches = function() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/branches";
    var result = getResultFromTravisAPI(apiPath).branches;
    for (var i = 0; i < result.length; i++) {
      var branchBuilds = this.getBuildsForBranch(result[i].name);
      this.branches.push(new JUnitBranch(result[i], branchBuilds, this.slug));
    }
  }

  this.getBuildsForBranch = function(aBranchName) {
    var b = [];
    for (var i = 0; i < this.allTravisBuilds.length; i++) {
      if (this.allTravisBuilds[i].branch.name == aBranchName) {
        b.push(this.allTravisBuilds[i]);
      }
    }
    return b;
  }

  //variables

  this.slug = slug;
  this.branches = [];
  this.allTravisBuilds = getAllTravisBuilds();
  this.getBranches();

  //private

  function getAllTravisBuilds() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/builds";
    return getResultFromTravisAPI(apiPath).builds;
  }


}
