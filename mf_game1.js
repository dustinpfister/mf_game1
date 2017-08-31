

var init = function () {

    _.l('init...');

    // view port
    vp.nw = 640;
    vp.nh = 480;
    vp.zoom(1);

    // canvas
    C.canvas.width = 640;
    C.canvas.height = 480;
    C.cls();

    // sections
    S.set(640, 480, 10, 10);
    S.ls(vp.x, vp.y, vp.w, vp.h);

    var sec = S.getPos(0, 0);
    sec.pl = {

        x : 0,
        y : 0,
        id : 'home'

    };

    _.l(vp);
    _.l(C);
    _.l(S);

},

// draw method
draw = function () {

    C.cls();
    S.load.forEach(function (sec) {

        C.hiDraw(function (ctx) {

            ctx.strokeStyle = '#00ff00';
            ctx.strokeRect(sec.x - vp.x, sec.y - vp.y, S.sw, S.sh);

        });

    });

},

x = 0, y = 0, i = 0, max = 500,
loop = function () {

    requestAnimationFrame(loop);

    x = Math.cos(Math.PI * 2 / max * i) * (vp.w);
    y = Math.sin(Math.PI * 2 / max * i) * (vp.h);

    vp.lookAt(x, y);

    S.ls(vp.x, vp.y, vp.w, vp.h);

    draw();

    i += 1;
    if (i === max) {

        i = 0;

    }

};

init();
loop();
