// Do NOT modify this fucker - magic
Raphael.fn.connect = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{
            x: bb1.x,
            y: bb1.y
        }, {
            x: bb1.x + bb1.width,
            y: bb1.y + bb1.height
        }, {
            x: bb1.x,
            y: bb1.y + bb1.height
        }, {
            x: bb1.x + bb1.width,
            y: bb1.y
        }, {
            x: bb2.x,
            y: bb2.y
        }, {
            x: bb2.x + bb2.width,
            y: bb2.y + bb2.height
        }, {
            x: bb2.x,
            y: bb2.y + bb2.height
        }, {
            x: bb2.x + bb2.width,
            y: bb2.y
        }],
        d = {},
        dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (
                ((i != 3 && j != 6) || p[i].x < p[j].x) &&
                ((i != 2 && j != 7) || p[i].x > p[j].x) &&
                ((i != 0 && j != 5) || p[i].y > p[j].y) &&
                ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({
            path: path
        });
        line.line.attr({
            path: path
        });
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({
                stroke: bg.split("|")[0],
                fill: "none",
                "stroke-width": bg.split("|")[1] || 3
            }),
            line: this.path(path).attr({
                stroke: color,
                fill: "none"
            }),
            from: obj1,
            to: obj2
        };
    }
};

// TODO: export variables to resources.js
Raphael.el.branchOut = function (text) {
    var branchx = this.attr('x'),
        branchy = this.attr('y');
    var txtBox = paper.text(branchx - 50, branchy - 50, text).getBBox();
    var child = paper.rect(txtBox.x - 10, txtBox.y - 10, txtBox.width + 20, txtBox.height + 20, 7)
        .attr(childTemplate);

    return child;
};