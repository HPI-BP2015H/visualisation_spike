var JUnitBranch = function(slug, branchName, cb) {
  var self = this;

  // variables
  this.slug = slug;
  this.name = branchName;
  this.builds = [];

  // init
  loadBuilds();

  // private
  function loadBuilds() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + self.slug + "/builds?branch.name=" + self.name;
    getResultFromTravisAPI(apiPath, function(data) {
      var travisBuilds = data.builds;
      for (var i = 0; i < travisBuilds.length; i++) {
        self.builds.push(new JUnitBuild(travisBuilds[i], self.slug));
      }
      cb();
    });
  }

}
