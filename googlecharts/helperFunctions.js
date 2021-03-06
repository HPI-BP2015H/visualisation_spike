function getResultViaAjax(anAPIPath, completionBlock, dataType, header) {
  jQuery.ajax({
    dataType: dataType,
    url: anAPIPath,
    headers: header,
    success: function(data, status, jqXHR) {
      // console.log("[DONE] getting result from " + anAPIPath);
      completionBlock(data);
    },
    error: function(jqXHR, status) {
      console.log("[FAILED] getting result from: " + anAPIPath);
      completionBlock();
    }
  });
};

function getResultFromTravisAPI(anAPIPath, completionBlock) {
  var header = {
    "Travis-API-Version": "3",
    //"User-Agent": "Travis-Visualisation"
  };
  getResultViaAjax("https://api.travis-ci.org/v3/" + anAPIPath, completionBlock, "json", header);
}

function getResultFromGithubAPI(anAPIPath, completionBlock) {
  var header = {
    //"User-Agent": "Travis-Visualisation"
  };
  getResultViaAjax("https://api.github.com/" + anAPIPath, completionBlock, "json", header);
};

function githubCompatibleSlug(slug) {
  return slug.replace(/\%2F/, "/");
}

function dateAlreadyInArray(array, time, weekday) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][1] == time && array[i][2] == weekday) {
      return i;
    }
  };
  return null;
};

function getWeekday(aDateInt) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[aDateInt];

}

function dateToHalfHours(date) {
  var hour = date.getHours() - 1;
  var minute = date.getMinutes();

  if (minute >= 15 && minute < 45) {
    hour += 0.5;
  } else {
    if (minute >= 45) {
      hour += 1.0;
    }
  }

  if (hour < 0) {
    hour = hour + 24;
  }

  return hour;
}

function printXML(builds) {
  for (var i = 0; i < builds.length; i++) {
    for (var j = 0; j < builds[i].jobs.length; j++) {
      var target = "https://api.travis-ci.org/jobs/" + builds[i].jobs[j].id + "/log.txt?deansi=true";
      jQuery.get(
        target,
        function(data) {
          console.log("[DONE] get logs");
          document.getElementsByTagName("body")[0].innerHTML += "JOB:<br/><br/>\n";
          document.getElementsByTagName("body")[0].innerHTML += data;
          document.getElementsByTagName("body")[0].innerHTML += "<br/><br/><br/>\n";
        },
        'text'
      );
    }
  }
}

function buildStateToBool(aState) {
  if (aState == "passed") {
    return true;
  } else {
    return false;
  }
}

function correctWeekday(aWeekday) {
  var reverseDays = [0, 6, 5, 4, 3, 2, 1];
  return reverseDays[aWeekday];
}

function percentageToTestColor(percent) {
  var green = 0.0;
  var red   = 0.0;

  if(percent > 100.0) { return "#00ff00"}
  if(percent <   0.0) { return "#ff0000"}

  if(percent >= 50.0) {
    green = 255.0;
    red = 255.0 * (-(1.0/50.0) * percent + 2.0);
  } else {
    green = 255.0 * ((1.0/50.0) * percent);
    red = 255.0;
  }
  return rgbToHex(Math.round(red), Math.round(green), 0);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
