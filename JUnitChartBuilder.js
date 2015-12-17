var JUnitChartBuilder = function(slug) {
  var self = this;

  // display loading
  $("#slug").text(slug);
  $("#overlay").show();

  // variables
  this.repo = new JUnitRepository(slug, generateCharts);

  // private
  function generateCharts() {
    console.log(self.repo);
    google.load("visualization", "1.0", {
      packages: ["corechart"],
      callback: function() {
        generateStackedAreaChart();
        generateBubbleChart();
        generateBranchHealthChart();
        $("#overlay").hide();
      }
    });
  }

  function generateStackedAreaChart() {
    var container = document.getElementById('stackedAreaChart');
    var chart = new google.visualization.AreaChart(container);
    var data = new google.visualization.arrayToDataTable(getDataForStackedAreaChart());
    var options = {
      isStacked: true,
      height: 400,
      legend: {
        position: "top"
      },
      hAxis: {
        title: "Builds"
      },
      vAxis: {
        title: "Tests",
        minValue: 0
      },
      series: [{
        color: 'red',
        visibleInLegend: true
      }, {
        color: 'yellow',
        visibleInLegend: true
      }, {
        color: 'green',
        visibleInLegend: true
      }]
    };
    chart.draw(data, options);
  }

  function generateBubbleChart() {

    /*var data = google.visualization.arrayToDataTable([
		['ID',    'time', 'Weekday', 'numberOfCommits',     'commitID'],
	]);*/
    var data = google.visualization.arrayToDataTable(getDataForBubbleChart());

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var options = {
      title: 'Correlation between commit date/time, number of commits and their percentage failures.',
      hAxis: {
        title: 'Time of Day',
        minValue: 0,
        maxValue: 24
      },
      vAxis: {
        title: 'Weekday',
        minValue: 0,
        maxValue: 6,
        ticks: [
          { v: 0, f: weekday[0]},
          { v: 1, f: weekday[6]},
          { v: 2, f: weekday[5]},
          { v: 3, f: weekday[4]},
          { v: 4, f: weekday[3]},
          { v: 5, f: weekday[2]},
          { v: 6, f: weekday[1]},
       ]

      },
      bubble: {
        textStyle: {
          fontSize: 11
        }
      },
      colorAxis: {
        colors: ['green', 'yellow', 'red'],
        minValue: 0,
        maxValue: 100
      }
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('bubble_chart'));
    chart.draw(data, options);

  }

  function getAllBuilds(){
    var builds = [];
    for (var i = 0; i < self.repo.branches.length; i++) {
      for (var j = 0; j < self.repo.branches[i].builds.length; j++) {
        builds.push(self.repo.branches[i].builds[j])
      }
    }
    return builds
  }

  function getDataForBubbleChart() { //for all branches
    var builds = getAllBuilds();

    var array = [
      ['ID', 'time', 'weekday', 'percentage of failures', 'number of commits']
    ];
    var weekday = null;
    var time = null;
    var isFailure = null;
    for (var i = 0; i < builds.length; i++) {
      time = dateToHalfHours(builds[i].commitTime);
      weekday = correctWeekday(builds[i].commitTime.getDay());
      isFailure = buildStateToBool(builds[i].status);
      var n = dateAlreadyInArray(array, time, weekday);
      if (n) {
        array[n][4] += 1;
        if (isFailure) {
          array[n][3] += 1;
        };
      } else {
        a = [''];
        a.push(time)
        a.push(weekday);
        if (isFailure) {
          a.push(1);
        } else {
          a.push(0);
        }
        a.push(1);
        array.push(a);
      }
    }
    for (var i = 1; i < array.length; i++) {
      array[i][3] = (array[i][3] / array[i][4]) * 100;
    }
    return array;
  };

  function getDataForStackedAreaChart() {
    var dataArray = [	["Build", "Error", "Fail", "Pass"] ];
    var builds = getAllBuilds();
    for (var i = 0; i < builds.length; i++) {
      var build = i; //builds[i].id//builds[i].commitTime
      var errorCount = 0;
      var failCount = 0;
      var passCount = 0;
      for (var j = 0; j < builds[i].jobs.length; j++) {
        errorCount += builds[i].jobs[j].errorCount;
        failCount += builds[i].jobs[j].failCount;
        passCount += builds[i].jobs[j].passCount;
      }
      dataArray.push([build, errorCount, failCount, passCount])
    }
    return dataArray

  }

  function generateBranchHealthChart() {

    var data = [
      ['Branch', 'Health', { role: "style" }]
    ];

    for (var i = 0; i < self.repo.branches.length; i++) {
      var passes = 0;
      for (var j = 0; j < self.repo.branches[i].builds.length; j++) {
        if (self.repo.branches[i].builds[j].status == "passed") {
          passes = passes + 1;
        }
      }
      var health = 0;
      if(self.repo.branches[i].builds.length > 0) {
        health = (passes) / (self.repo.branches[i].builds.length);
      }
      data.push([self.repo.branches[i].name, health, percentageToTestColor(health*100)]);
    }

    data.sort(function(a, b) {
      return b[1] - a[1];
    });

    var options = {
      height: self.repo.branches.length * 35 + 35,
      bars: 'horizontal',
      title: 'Branch Health',
      hAxis: {
        format: "percent",
        gridlines: {
          count: 11
        },
        viewWindow: {
          max:1,
          min:0
        },
        textStyle: {
          bold: false
        }
      },
      legend: {
        position: "none"
      }
    };

    var chart = new google.visualization.BarChart(document.getElementById('branch_health'));
    chart.draw(google.visualization.arrayToDataTable(data), options);

  }

}
