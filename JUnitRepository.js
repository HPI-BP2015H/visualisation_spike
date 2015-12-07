var JUnitRepository = function(slug) {

  //variables

  this.slug = slug;
  this.branches = [];

  // init

  this.branches = getAllBranches(this.slug);

  //private

  function getAllBranches(slug) {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + slug + "/branches";
    var branches = [];
    var travisBranches = getResultFromTravisAPI(apiPath).branches;
    for (var i = 0; i < travisBranches.length; i++) {
      branches.push(new JUnitBranch(slug, travisBranches[i].name));
    }
    return branches;
  }

}
