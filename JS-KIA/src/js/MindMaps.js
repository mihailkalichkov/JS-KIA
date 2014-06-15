var mindmaps = mindmaps || {};

/* Start up. This function is executed when the DOM is loaded. */
$(function() {

  // create a new app controller and go
  var appController = new mindmaps.ApplicationController();
  appController.go();
});



