var JUnitBranch = function(slug, branchName, cb) {

  //variables

  this.slug = slug;
  this.name = branchName;
  this.builds = [];

  // init

  loadBuilds(this);

  // private

  function loadBuilds(branch) {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + branch.slug + "/builds?branch.name=" + branch.name;
    getResultFromTravisAPI(apiPath, function(data) {
      var builds = [];
      var travisBuilds = data.builds;
      for (var i = 0; i < travisBuilds.length; i++) {
        builds.push(new JUnitBuild(travisBuilds[i], branch.slug));
      }
      branch.builds = builds;
      cb();
    });
  }

}
