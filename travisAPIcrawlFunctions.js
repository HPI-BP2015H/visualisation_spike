function getBuilds() {
  $.ajaxSetup({async: false});
  // get builds
  var helper = null;
  jQuery.ajax({
    type: "GET",
    headers: {
      "Travis-API-Version":"3"
    },
    dataType: "json",
    url: "https://api.travis-ci.org/v3/repo/" + slug + "/builds",
    success: function (data, status, jqXHR) {
      console.log("[DONE] get builds");
      helper = data.builds;
    },
    error: function (jqXHR, status) {
      console.log("[FAILED] get builds");
      console.log(jqXHR);
      console.log(status);
    }
  });
  return helper;
};

function getAllCommitsWithDate(){
  var builds = getBuilds();
  var array = [['ID', 'Weekday']];
  for(var i = 0; i < builds.length; i++) {
    a = [''];
    a.push(builds[i].commit.id);
    console.log(builds[i].commit.committed_at);
    a.push(new Date(builds[i].commit.committed_at).getDay());
    array.push(a);
  }

  console.log(array);
}

function getWeekday(aDateInt){
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[aDateInt];

}
