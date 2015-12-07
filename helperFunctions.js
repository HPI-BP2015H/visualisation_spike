function getResultFromTravisAPI(anAPIPath) {
  $.ajaxSetup({async: false});
  var helper = null;
  jQuery.ajax({
    type: "GET",
    headers: {
      "Travis-API-Version":"3"
    },
    dataType: "json",
    url: anAPIPath,
    success: function (data, status, jqXHR) {
      console.log("[DONE] getting result from " + anAPIPath);
      helper = data;
    },
    error: function (jqXHR, status) {
      console.log("[FAILED] getting result");
      console.log(jqXHR);
      console.log(status);
    }
  });
  return helper;
};


function getResultFromGithubAPI(anAPIPath) {
  $.ajaxSetup({async: false});
  var helper = null;
  jQuery.ajax({
    type: "GET",
    /*headers: {
      "Travis-API-Version":"3"
    },*/
    dataType: "json",
    url: anAPIPath,
    success: function (data, status, jqXHR) {
      console.log("[DONE] getting result from " + anAPIPath);
      helper = data;
    },
    error: function (jqXHR, status) {
      console.log("[FAILED] getting result");
      console.log(jqXHR);
      console.log(status);
    }
  });
  return helper;
};


function githubCompatibleSlug(slug){
  return slug.replace(/\%2F/, "/");
}




function getAllCommitsWithDate(){
  var builds = getBuilds();
  var array = [['ID', 'Time', 'Weekday', 'numberOfFailures', 'numberofCommits']];
  var weekday = null;
  var time = null;
  var isFailure = null;
  for(var i = 0; i < builds.length; i++) {
    time = dateToHalfHours(new Date(builds[i].commit.committed_at));
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

}

function dateToHalfHours(date) {
  var hour = date.getHours()-1;
  var minute = date.getMinutes();

  if(minute >= 15 && minute < 45) {
    hour += 0.5;
  } else {
    if(minute >= 45) {
      hour += 1.0;
    }
  }

  if(hour < 0) {
    hour = hour + 24;
  }

  return hour;
}
