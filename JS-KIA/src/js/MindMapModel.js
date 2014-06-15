/**
 * <pre>
 * Creates a new MindMapModel. 
 * 
 * This object represents the underlying mind map model and provides access 
 * to the document, the mind map and the currently selected node.
 * 
 * All changes to the mind map pass through this object, either through calling
 * methods directly or using the executeAction() method to perform NodeActions.
 * </pre>
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 */
mindmaps.MindMapModel = function (eventBus, commandRegistry) {
    var self = this;
    this.document = null;
    this.selectedNode = null;

    /* Sets the current document and will publish a DOCUMENT_OPENED event. */
    this.setDocument = function (doc) {
        this.document = doc;
        eventBus.publish(mindmaps.Event.DOCUMENT_OPENED, doc);
    };

    this.getMindMap = function () {
        if (this.document) {
            return this.document.mindmap;
        }
        return null;
    };

    this.init = function () {
        var createNodeCommand = commandRegistry.get(mindmaps.CreateNodeCommand);
        createNodeCommand.setHandler(this.createNode.bind(this));

        //var createSiblingNodeCommand = commandRegistry.get(mindmaps.CreateSiblingNodeCommand);
        //createSiblingNodeCommand.setHandler(this.createSiblingNode.bind(this));

        var deleteNodeCommand = commandRegistry.get(mindmaps.DeleteNodeCommand);
        deleteNodeCommand.setHandler(this.deleteNode.bind(this));
    };

    this.deleteNode = function (node) {
        if (!node) {
            node = this.selectedNode;
        }
        var map = this.getMindMap();
        var action = new mindmaps.action.DeleteNodeAction(node, map);
        this.executeAction(action);
    };

    this.createNode = function (node, parent) {
        var map = this.getMindMap();
        if (!(node && parent)) {
            parent = this.selectedNode;
            var action = new mindmaps.action.CreateAutoPositionedNodeAction(
                parent, map);
        } else {
            var action = new mindmaps.action.CreateNodeAction(node, parent, map);
        }

        this.executeAction(action);
    };

    this.createSiblingNode = function () {
        var map = this.getMindMap();
        var selected = this.selectedNode;
        var parent = selected.getParent();

        // root nodes dont have a parent
        if (parent === null) {
            return;
        }

        var action = new mindmaps.action.CreateAutoPositionedNodeAction(parent, map);
        this.executeAction(action);
    };

    this.selectNode = function (node) {
        if (node === this.selectedNode) {
            return;
        }

        var oldSelected = this.selectedNode;
        this.selectedNode = node;
        eventBus.publish(mindmaps.Event.NODE_SELECTED, node, oldSelected);
    };

    this.changeNodeCaption = function (node, caption) {
        if (!node) {
            node = this.selectedNode;
        }

        var action = new mindmaps.action.ChangeNodeCaptionAction(node, caption);
        this.executeAction(action);
    };

    /**
     * Executes a node action. An executed action might raise an event over the
     * event bus and cause an undo event to be emitted via
     * MindMapModel#undoAction.
     * 
     * @param {mindmaps.Action} action
     */
    this.executeAction = function (action) {
        // a composite action consists of multiple actions which are
        // processed individually.
        if (action instanceof mindmaps.action.CompositeAction) {
            var execute = this.executeAction.bind(this);
            action.forEachAction(execute);
            return;
        }

        var executed = action.execute();

        // cancel action if false was returned
        if (executed !== undefined && !executed) {
            return false;
        }

        // publish event
        if (action.event) {
            if (!Array.isArray(action.event)) {
                action.event = [action.event];
            }
            eventBus.publish.apply(eventBus, action.event);
        }

        // register undo function if available
        if (action.undo) {
            var undoFunc = function () {
                self.executeAction(action.undo());
            };

            // register redo function
            if (action.redo) {
                var redoFunc = function () {
                    self.executeAction(action.redo());
                };
            }

        }
    };

    this.init();
};
