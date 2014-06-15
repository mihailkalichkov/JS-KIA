/* Creates a new Application Controller. */
mindmaps.ApplicationController = function () {
    var eventBus = new mindmaps.EventBus();
    var commandRegistry = new mindmaps.CommandRegistry(); //keep
    var mindmapModel = new mindmaps.MindMapModel(eventBus, commandRegistry);

    this.go = function () {
        var viewController = new mindmaps.MainViewController(eventBus, mindmapModel, commandRegistry);
        viewController.go();

        mindmaps.mindmap = new mindmaps.MindMap();
        mindmapModel.setDocument(mindmaps);
    };

};
