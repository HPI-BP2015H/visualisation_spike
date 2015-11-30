function printXML() {
  /*var content = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?> <testsuite name=\"BaselineOfSWTDemo\" tests=\"1\" failures=\"0\" errors=\"0\" time=\"0.0\"> <testcase classname=\"SWTDemo.Tests.SWTDemoTest\" name=\"testAnotherValue\" time=\"0.0\">     </testcase><testcase classname=\"SWTDemo.Tests.SWTDemoTest\" name=\"testValue\" time=\"0.0\">     </testcase>    <system-out><![CDATA[]]></system-out>    <system-err><![CDATA[]]></system-err> </testsuite>";
  var parser = new DOMParser();
  var tree = parser.parseFromString(content, "text/xml");

  console.log("baseline: " + tree.getElementsByTagName("testcase")[0].getAttribute("classname"));
  console.log("tests: " + tree.documentElement.getAttribute("tests"));
  console.log("failures: " + tree.documentElement.getAttribute("failures"));
  console.log("errors: " + tree.documentElement.getAttribute("errors"));
  console.log("time: " + tree.documentElement.getAttribute("time"));*/

  $.ajaxSetup({async: true});
  var slug = "HPI-BP2015H%2FSWT-Demo"

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
      console.log(data);
    },
    error: function (jqXHR, status) {
      console.log("[FAILED] get builds");
      console.log(jqXHR);
      console.log(status);
    }
  });
}
