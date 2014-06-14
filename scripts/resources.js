var mindMapWidth = 800,
    mindMapHeight = 800;

// template for generating root node
var rootTemplate = {
    fill: 'brown',
    stroke: '#000',
    "fill-opacity": 0.3,
    "stroke-width": 2
};

// template for child nodes
// TODO: generate other templates - color,stroke,fill,opacity
var childTemplate = {
    fill: 'yellowgreen',
    stroke: '#000',
    "fill-opacity": 0.5,
    "stroke-width": 2,
    cursor: "move"
};