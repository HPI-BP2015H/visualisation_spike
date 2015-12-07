var JUnitRepository = function(slug) {
  this.slug = slug;

  var branchNames = getBranchNames();
  var branches = [];

  for(var i = 0; i < branches.length; i++) {
    branches.push(new JUnitBranch(slug, branchNames[i]));
  }

  function getBranchNames() {
    // TODO: Implement.
    return [];
  }
}
