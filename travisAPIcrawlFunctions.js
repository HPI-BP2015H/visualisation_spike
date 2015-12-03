function getXML() {
  $.ajaxSetup({async: true});
  var slug = "HPI-BP2015H%2FSWT-Demo"
  var helper = null;
  // get builds
  jQuery.ajax({
    type: "GET",
    headers: {
      "Travis-API-Version":"3"
    },
    dataType: "json",
    url: "https://api.travis-ci.org/v3/repo/" + slug + "/builds",
    success: function (data, status, jqXHR) {
      console.log("[DONE] get builds");
      printXML(data.builds);
    },
    error: function (jqXHR, status) {
      console.log("[FAILED] get builds");
      console.log(jqXHR);
      console.log(status);
    }
  });
};

function getAuthorOf(commit){
  test = 'test';
}
