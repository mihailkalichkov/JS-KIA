/* Creates a new mind map.*/
mindmaps.MindMap = function(root) {
  /* nodes is only used for quick lookup of a node by id. Each node must be
   * registered in this map via createNode() or addNode(node). */
  this.nodes = new mindmaps.NodeMap();

  if (root) {
    this.root = root;
  } else {
    this.root = new mindmaps.Node();
    this.root.text.font.size = 20;
    this.root.text.font.weight = "bold";
    this.root.text.caption = "Root Idea";
  }

  this.addNode(this.root);
};



/* Adds an existing node and all its children to the nodes map.*/
mindmaps.MindMap.prototype.addNode = function(node) {
  this.nodes.add(node);
};

/* Removes a node from the mind map. Severs tie to the parent. */
mindmaps.MindMap.prototype.removeNode = function(node) {
  // detach node from parent
  var parent = node.parent;
  parent.removeChild(node);

  // clear nodes table: remove node and its children
  var self = this;
  node.forEachDescendant(function(descendant) {
    self.nodes.remove(descendant);
  });

  this.nodes.remove(node);
};

/* Get the root of the mind map. */
mindmaps.MindMap.prototype.getRoot = function() {
  return this.root;
};
