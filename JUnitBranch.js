var JUnitBranch = function(slug, name) {
  this.slug = slug;
  this.name = name;

  var buildIDs = getBuildIDs();
  var builds = [];

  for(var i = 0; i < buildsIDs.length; i++) {
    builds.push(new JUnitBuild(buildIDs[i]));
  }

  function getBuildIDs() {
    // TODO: Implement.
    return [];
  }
}
