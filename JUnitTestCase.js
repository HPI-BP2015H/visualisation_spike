var JUnitTestCase = function(jUnitDOMSubtree){

  this.time = getTime();
  this.name = getName();
  this.status = getStatus();
  this.classname = getClassname();

  function getTime(){
    return jUnitDOMSubtree.getAttribute("time");
  }

  function getName(){
    return jUnitDOMSubtree.getAttribute("name");
  }

  function getStatus(){
    return jUnitDOMSubtree.getAttribute("status");
  }

  function getClassname(){
    return jUnitDOMSubtree.getAttribute("classname");
  }

}
