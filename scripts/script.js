window.onload = function () {
    paper = Raphael('mindContainer', 800, 600);

    var connected = [];

    paper.text(430, 200, 'ROOT');
    var root = paper.rect(390, 180, 60, 40, 10)
        .attr(rootTemplate);

    var child = root.branchOut('smile you sexy\n mother\n fucker')
        .drag(onDragMove, onDragStart, onDragEnd)
    connected.push(paper.connect(root, child, '#555'))

    function onDragStart() {
        //console.log(this);
        this.ox = this.attr('x');
        this.oy = this.attr('y');
        this.animate({
            'fill-opacity': .1
        }, 500, 'easeInOut');
    };

    function onDragMove(dx, dy) {
        var delta = {
            x: this.ox + dx,
            y: this.oy + dy
        };
        this.attr(delta);

        var txtDelta = {
            x: delta.x + this.attr('width') / 2,
            y: delta.y + this.attr('height') / 2
        };
        paper.getById(this.id - 1).attr(txtDelta);

        for (var i = connected.length; i--;) {
            //    if (i % 2 === 0)
            paper.connect(connected[i]);
        }
        paper.safari();
    };

    function onDragEnd() {
        this.animate({
            'fill-opacity': 0.7
        }, 500, 'easeIn');
    };
}