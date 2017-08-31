var _ = {

    // console.log wrap
    l : function (m) {

        console.log(m);

    },

    // distance formula (a = x1, b = y1, c=x2, d=y2)
    d : function (a, b, c, d) {

        //return Math.sqrt(Math.pow(a - b, 2) + Math.pow(b - d, 2));

        var e = a - c,
        f = b - d;
        return Math.sqrt(e * e + f * f);

    },

    // bounding box collision detection
    b : function (a, b) {

        return !(
            ((a.y + a.h) < (b.y)) ||
            (a.y > (b.y + b.h)) ||
            ((a.x + a.w) < b.x) ||
            (a.x > (b.x + b.w)));

    },

    // getDocumentById wrap
    g : function (id) {

        return document.getElementById(id);

    },

    // shallow clone of an object
    c : function (obj) {

        var n = {};

        for (var prop in obj) {

            if (typeof prop != 'object') {

                n[prop] = obj[prop];

            }

        }

        return n;

    }

};
