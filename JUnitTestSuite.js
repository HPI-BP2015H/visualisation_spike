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
    // TODO: Implement.
  }

  function getName() {
    // TODO: Implement.
    return "";
  }

  function getTime() {
    // TODO. Implement.
    return 0;
  }

  function getTestcaseCount() {
    // TODO: Implement.
    return 0;
  }

  function getFailCount(){
    // TODO: Implement.
    return 0;
  }

  function getPassCount(){
    // TODO: Implement.
    return 0;
  }

  function getErrorCount(){
    // TODO: Implement.
    return 0;
  }

}
