

function generateCharts() {
  generateStackedAreaChart();
  generateBubbleChart();
}

function generateStackedAreaChart() {
  // Just a mock-up right now.
  google.load("visualization", "1.0", {packages:["corechart"]});
  google.setOnLoadCallback(function() {
    var container = document.getElementById('stackedAreaChart');
    var chart = new google.visualization.AreaChart(container);
    var data = google.visualization.arrayToDataTable([
      ["Build", "Fail", "Pass"],
      [    "1",      7,     83],
      [    "2",      8,     82],
      [    "3",      0,     90],
      [    "4",     15,     90],
      [    "5",      7,     98]
    ]);
    var options = {
      isStacked: true,
      height: 400,
      legend: {
        position: "top",
        maxLines: 3
      },
      hAxis: {
        title: "Builds"
      },
      vAxis: {
        title: "Tests",
        minValue: 0
      }
    };
    chart.draw(data, options);
  });
}

function generateBubbleChart(){
  google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawSeriesChart);

      function drawSeriesChart() {

        var data = google.visualization.arrayToDataTable([
          ['ID',    'Time', 'Fertility Rate', 'Region',     'Population'],
          ['CAN',    80.66,              1.67,      'North America',  33739900],
          ['DEU',    79.84,              1.36,      'Europe',         81902307],
          ['DNK',    78.6,               1.84,      'Europe',         5523095],
          ['EGY',    72.73,              2.78,      'Middle East',    79716203],
          ['GBR',    80.05,              2,         'Europe',         61801570],
          ['IRN',    72.49,              1.7,       'Middle East',    73137148],
          ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
          ['ISR',    81.55,              2.96,      'Middle East',    7485600],
          ['RUS',    68.6,               1.54,      'Europe',         141850000],
          ['USA',    78.09,              2.05,      'North America',  307007000]
        ]);

        var options = {
          title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
          hAxis: {title: 'Time'},
          vAxis: {title: 'Fertility Rate'},
          bubble: {textStyle: {fontSize: 11}}
        };

        var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
        chart.draw(data, options);
      }


}




function printXML() {
  var builds = getXML();
  for(var i = 0; i < builds.length; i++) {
    for(var j = 0; j < builds[i].jobs.length; j++) {
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
