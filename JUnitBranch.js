var JUnitBranch = function(travisBranchObject, builds, slug) {

  this.slug = slug;
  this.name = travisBranchObject.name;
  this.builds = builds;


}
