var JUnitRepository = function(slug) {
  this.slug = slug;

  var branches = getBranches();

  /*for(var i = 0; i < branchNames.length; i++) {
    branches.push(new JUnitBranch(slug, branchNames[i]));
  }*/

  function getBranches() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/branches";
    var result = getResultFromAPIPath(apiPath).branches;
    console.log(result);
    return [];
  }
}
