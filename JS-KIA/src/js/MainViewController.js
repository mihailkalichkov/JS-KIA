mindmaps.CanvasContainer = function () {
    var self = this;
    var $content = $("#canvas-container");

    /**
     * @returns {jQuery}
     */
    this.getContent = function () {
        return $content;
    };

    /**
     * Sets the height of the canvas to fit between header and footer.
     */
    this.setSize = function () {
        var windowHeight = $(window).height();
        var headerHeight = $("#topbar").outerHeight(true);
        var footerHeight = $("#bottombar").outerHeight(true);
        var height = windowHeight - headerHeight - footerHeight;
        $content.height(height);
    };

    /**
     * Set up the container to accept drag and drop of files from the desktop.
     */
    this.acceptFileDrop = function () {

        function ignore(e) {
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();
        }

        function handleDragOver(e) {
            ignore(e);
        }

        function handleDrop(e) {
            ignore(e);

            var files = e.originalEvent.dataTransfer.files;
            var file = files[0];

            var reader = new FileReader();
            reader.onload = function () {
                self.receivedFileDrop(reader.result);
            };
            reader.readAsText(file);
        }

        $content.bind('dragover', handleDragOver);
        $content.bind('drop', handleDrop);
    };

    this.init = function () {
        // recalculate size when window is resized.
        $(window).resize(function () {
            self.setSize();
        });

        this.setSize();
        this.acceptFileDrop();
    };

    /**
     * Callback for when a file was dropped onto the container.
     * 
     * @event
     * @param {String} result
     */
    this.receivedFileDrop = function (result) {
    };

};

EventEmitter.mixin(mindmaps.CanvasContainer);


/* Creates a new MainViewController. The controller is responsible for creating
 * all main ui elements. */
mindmaps.MainViewController = function (eventBus, mindmapModel, commandRegistry) {
    var canvasContainer = new mindmaps.CanvasContainer();

    this.go = function () {
        canvasContainer.init();

        // toolbar
        //var toolbar = new mindmaps.ToolBarView();
        //var toolbarPresenter = new mindmaps.ToolBarPresenter(commandRegistry, toolbar);
        //toolbarPresenter.go();

        // canvas
        var canvas = new mindmaps.DefaultCanvasView();
        var canvasPresenter = new mindmaps.CanvasPresenter(eventBus, commandRegistry, mindmapModel, canvas);
        canvasPresenter.go();
    };
};
