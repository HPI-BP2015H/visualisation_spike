var JUnitBranch = function(rawData) {

  

  this.slug = slug;
  this.name = name;

  var buildIDs = getBuildIDs();
  var builds = [];

  for(var i = 0; i < buildIDs.length; i++) {
    builds.push(new JUnitBuild(buildIDs[i]));
  }

  function getBuildIDs() {
    // TODO: Implement.
    return [];
  }
}
