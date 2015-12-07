var JUnitBranch = function(rawData, builds, slug) {
  this.slug = slug;
  this.name = rawData.name;
  this.builds = builds;
  getBuilds();


  function getBuilds() {
    var apiPath = "https://api.travis-ci.org/v3/repo/" + this.slug + "/branches";
    var result = getResultFromAPIPath(apiPath).builds;
    for each (build in result) {
      this.builds.push(new JUnitBuild(build, this.slug));
    }
  }
}
