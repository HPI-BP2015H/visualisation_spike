var JUnitRepository = function(slug, cb) {

  //variables

  this.slug = slug;
  this.branches = [];

  // init

  loadBranches(this);

  //private

  function loadBranches(repository) {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + repository.slug + "/branches";
    getResultFromTravisAPI(apiPath, function(data) {
      var branches = [];
      var travisBranches = data.branches;
      var doneCount = 0;
      for (var i = 0; i < travisBranches.length; i++) {
        branches.push(new JUnitBranch(repository.slug, travisBranches[i].name, function () {
          doneCount++;
          if (doneCount == travisBranches.length) {
            cb();
          }
        }));
      }
      repository.branches = branches;
    });
  }
}
