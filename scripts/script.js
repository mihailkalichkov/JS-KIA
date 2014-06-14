window.onload = function () {
    paper = Raphael('mindContainer', mindMapWidth, mindMapHeight);

    var connected = []; // collect nodes so you can track  links between them

    // Generate ROOT node
    // always generate txt first
    var txtBox = paper.text(mindMapWidth / 2, mindMapHeight / 2, 'ROOT').getBBox();
    // node buble after that
    var root = paper
        .rect(txtBox.x - 10, txtBox.y - 10, txtBox.width + 20, txtBox.height + 20, 17)
        .attr(rootTemplate);

    // sample node that derives from ROOT
    // branchOut() is custom - helpers.js
    var child = root
        .branchOut('smile you sexy\n mother\n fucker')
        .drag(onDragMove, onDragStart, onDragEnd); // make draggable; ROOT is handicapped (by design)

    // remember the connectios
    // TODO: child creation to be triggered by event
    connected.push(paper.connect(root, child, '#555'))

    // drag event handlers
    function onDragStart() {
        this.ox = this.attr('x');
        this.oy = this.attr('y');
        this.animate({
            'fill-opacity': .1
        }, 500, 'easeInOut'); // TODO: play around with animation
    };

    function onDragMove(dx, dy) {
        var delta = {
            x: this.ox + dx,
            y: this.oy + dy
        };
        this.attr(delta);

        // TODO: think of abstracting this formula - used often
        var txtDelta = {
            x: delta.x + this.attr('width') / 2,
            y: delta.y + this.attr('height') / 2
        };
        // this works because the first element is 
        // txt element & next is rect element
        paper.getById(this.id - 1).attr(txtDelta);

        for (var i = connected.length; i--;) {
            paper.connect(connected[i]);
        }

        paper.safari();
    };

    function onDragEnd() {
        this.animate({
            'fill-opacity': 0.7
        }, 500, 'easeIn'); // TODO: play around with animation
    };
}