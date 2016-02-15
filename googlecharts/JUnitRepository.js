var JUnitRepository = function(slug, callback) {
  var self = this;

  // variables
  this.slug = slug;
  this.branches = [];

  // init
  loadBranches();

  // private
  function loadBranches() {
    var apiPath = "repo/" + self.slug + "/branches";
    getResultFromTravisAPI(apiPath, function(data) {
      if(data == undefined) {
        callback();
      } else {
        var travisBranches = data.branches;
        var doneCount = 0;
        for (var i = 0; i < travisBranches.length; i++) {
          self.branches.push(new JUnitBranch(self.slug, travisBranches[i].name, function () {
            doneCount++;
            if (doneCount == travisBranches.length) {
              callback();
            }
          }));
        }
      }
    });
  }
}
