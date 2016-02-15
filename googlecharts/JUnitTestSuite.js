var JUnitTestSuite = function(jUnitDOMSubtree){

  var self = this;

  this.testcases = [];

  this.name = getName();
  this.time = getTime();
  this.testcaseCount = getTestcaseCount();
  this.failCount = getFailCount();
  this.passCount = getPassCount();
  this.errorCount = getErrorCount();

  function createTestcases() {
    var jUnitTestcases = jUnitDOMSubtree.getElementsByTagName("testcase");
    for(var i = 0; i < jUnitTestcases.length; i++) {
      self.testcases.push(new JUnitTestCase(jUnitTestcases[i]));
    }
  }

  function getName() {
    return jUnitDOMSubtree.getAttribute("name");
  }

  function getTime() {
    return jUnitDOMSubtree.getAttribute("time");
  }

  function getTestcaseCount() {
    return jUnitDOMSubtree.getAttribute("tests");
  }

  function getFailCount(){
    return parseInt(jUnitDOMSubtree.getAttribute("failures"));
  }

  function getPassCount(){
    return (jUnitDOMSubtree.getAttribute("tests") - jUnitDOMSubtree.getAttribute("failures"));
  }

  function getErrorCount(){
    return parseInt(jUnitDOMSubtree.getAttribute("errors"));
  }

}
