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
  var array = [['ID', 'Time', 'Weekday', 'numberOfFailures', 'numberofCommits']];
  var weekday = null;
  var time = null;
  var isFailure = null;
  for(var i = 0; i < builds.length; i++) {
    time = 12.5;
    weekday = new Date(builds[i].commit.committed_at).getDay();
    isFailure = true;
    var n = dateAlreadyInArray(array, time, weekday);
    if (n) {
      array[n][4] += 1;
      if (isFailure){
        array[n][3] += 1;
      };
    } else {
      a = [''];
      a.push(time)
      a.push(weekday);
      if (isFailure){
        a.push(1);
      } else {
        a.push(0);
      }
      a.push(1);
      array.push(a);
    }
  }
  return array;
};

  function dateAlreadyInArray(array, time, weekday){
    for (var i = 0; i < array.length; i++) {
      if (array[i][1] == time && array[i][2] == weekday){
        return i;
      }
    };
    return null;
  };

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

  };
