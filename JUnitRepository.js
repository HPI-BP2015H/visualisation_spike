var JUnitRepository = function(slug) {
  this.slug = slug;

  var branchNames = getBranchNames();
  var branches = [];

  for(var i = 0; i < branchNames.length; i++) {
    branches.push(new JUnitBranch(slug, branchNames[i]));
  }

  function getBranchNames() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/branches";
    // TODO: Implement.
    return [];
  }
}
