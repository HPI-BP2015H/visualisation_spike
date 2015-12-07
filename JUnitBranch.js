var JUnitBranch = function(slug, branchName) {

  //variables

  this.slug = slug;
  this.name = branchName;
  this.builds = [];

  // init
  this.builds = getAllBuilds(this.slug, this.name);

  // private

  function getAllBuilds(slug, branchName) {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + slug + "/builds?branch.name=" + branchName;
    var builds = [];
    var travisBuilds = getResultFromTravisAPI(apiPath).builds;
    for (var i = 0; i < travisBuilds.length; i++) {
      builds.push(new JUnitBuild(travisBuilds[i], slug));
    }
    return builds;
  }

}
