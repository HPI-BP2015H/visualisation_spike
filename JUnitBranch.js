var JUnitBranch = function(travisBranchObject, builds, slug) {

  this.createJUnitBuilds = function() {
    for (var i = 0; i < builds.length; i++) {
      this.builds.push(new JUnitBuild(builds[i], slug));
    }
  }

  this.name = travisBranchObject.name;
  this.slug = slug;
  this.builds = [];
  this.createJUnitBuilds();

}
