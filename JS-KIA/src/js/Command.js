/**
 * Creates a new command. Base class for all commands
 * 
 * @constructor
 * @borrows EventEmitter
 */
mindmaps.Command = function() {
};

/**
 * Events that can be emitted by a command object.
 * @namespace
 */
mindmaps.Command.Event = {
  HANDLER_REGISTERED : "HandlerRegisteredCommandEvent",
  HANDLER_REMOVED : "HandlerRemovedCommandEvent",
  ENABLED_CHANGED : "EnabledChangedCommandEvent"
};

mindmaps.Command.prototype = {
  /**
   * Executes the command. Tries to call the handler function.
   */
  execute : function() {
    if (this.handler) {
      this.handler();
    } 
  },

  /**
   * Registers a new handler.
   * 
   * @param {Function} handler
   */
  setHandler : function(handler) {
    this.removeHandler();
    this.handler = handler;
    //this.publish(mindmaps.Command.Event.HANDLER_REGISTERED);
  },

  removeHandler : function() {
    this.handler = null;
  },


};

/* Mixin EventEmitter into command objects. */
EventEmitter.mixin(mindmaps.Command);


mindmaps.CreateNodeCommand = function() {
  this.id = "CREATE_NODE_COMMAND";
  this.label = "Add";
  this.enabled = true;
};
mindmaps.CreateNodeCommand.prototype = new mindmaps.Command();

mindmaps.DeleteNodeCommand = function() {
  this.id = "DELETE_NODE_COMMAND";
  this.label = "Delete";
  this.enabled = true;
};
mindmaps.DeleteNodeCommand.prototype = new mindmaps.Command();

/* Creates a new CommandRegistry. */
mindmaps.CommandRegistry = function () {
    this.commands = {};

    /* Returns a command object for the given command type. */
    this.get = function (commandType) {
        var command = this.commands[commandType];
        if (!command) {
            command = new commandType;
            this.commands[commandType] = command;
        }
        return command;
    };
};


