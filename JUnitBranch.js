var JUnitBranch = function(slug, branchName, callback) {
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
      var doneCount=0;
      for (var i = 0; i < travisBuilds.length; i++) {
        self.builds.push(new JUnitBuild(travisBuilds[i], self.slug, function(){
          doneCount++;
          if (doneCount == travisBuilds.length) {
            callback();
          }
        }));
      }
    });
  }

}
