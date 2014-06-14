window.onload = function () {
    paper = Raphael('mindContainer', 800, 600);

    paper.setStart();
    paper.text(320, 100, 'sample text');
    paper.rect(290, 80, 60, 40, 10)
        .attr({
            fill: 'yellowgreen',
            stroke: '#000',
            "fill-opacity": 0.7,
            "stroke-width": 2,
            cursor: "move"
        });
    paper.text(430, 200, 'another text');
    paper.rect(390, 180, 60, 40, 10)
        .attr({
            fill: 'yellowgreen',
            stroke: '#000',
            "fill-opacity": 0.7,
            "stroke-width": 2,
            cursor: "move"
        });
    var shapes = paper.setFinish();

    //console.log(shapes);
    shapes[1].drag(onDragMove, onDragStart, onDragEnd);
    shapes[3].drag(onDragMove, onDragStart, onDragEnd);

    //    eve.on('key', function () {
    //        console.log('got event');
    //    })
    var connected = [];
    //
    //    paper.forEach(function (e) {
    //        console.log(e);
    //    });
    connected.push(paper.connect(shapes[1], shapes[3], '#555'))

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
            if (i % 2 === 0)
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