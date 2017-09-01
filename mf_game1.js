
var playerObj,
currentPl = {};

// my "on planet" method
var onPl = function (sec, obj) {

    var i;
    if (sec) {

        i = sec.pl.length;
        while (i--) {

            if (_.b(sec.pl[i], obj)) {

                return sec.pl[i];

            }

        }

    }

    return false;

};

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

    // pl array for each section
    S.secs.forEach(function (sec) {

        sec.pl = [];

    });

    // some starting planets
    var sec = S.getPos(-32, -32);
    sec.pl.push({

        x : -32,
        y : -32,
        w : 64,
        h : 64,
        id : 'home'

    });
    sec.pl.push({

        x : -230,
        y : -128,
        w : 32,
        h : 32,
        id : 'moon'

    });

    // playerObj
    playerObj = {

        x : -8,
        y : -8,
        w : 16,
        h : 16

    };

    _.l(vp);
    _.l(C);
    _.l(S);

},

// draw method
draw = function () {

    var x,
    obj,
    y,
    w,
    h;

    C.cls();
    S.load.forEach(function (sec) {

        C.hiDraw(function (ctx) {

            obj = vp.makeVPRel({

                    x : sec.x,
                    y : sec.y,
                    w : S.sw,
                    h : S.sh

                });

            ctx.strokeStyle = '#00ff00';
            ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
            /*
            obj = vp.scaleToFit({

            x : sec.x,
            y : sec.y,
            w : S.sw,
            h : S.sh

            }, 320, 240, 0, 0);

            ctx.strokeStyle = 'rgba(0,128,0,.5)';
            ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
             */

            if (sec.pl.length > 0) {

                sec.pl.forEach(function (pl) {

                    pl = vp.makeVPRel(pl);

                    ctx.strokeStyle = '#00ffff';
                    ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);

                });

                /*
                var w = 320,
                h = 240,
                x = 0,
                y = 0;

                pl = vp.scaleToFit(sec.pl, w, h, x, y);

                ctx.fillStyle = 'rgba(128,128,128,.5)';
                ctx.fillRect(x, y, w, h);
                ctx.strokeStyle = 'rgba(0,128,128,.5)';
                ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);

                 */
            }

        });

    });

    // draw the player object
    C.hiDraw(function (ctx) {

        var obj = vp.makeVPRel(playerObj);

        ctx.strokeStyle = '#ff00ff';
        ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);

    });
	
	C.drawInfo([currentPl.id || '']);

},

x = 0, y = 0, i = 0, max = 1250,
loop = function () {

    requestAnimationFrame(loop);

    //x = Math.cos(Math.PI * 2 / max * i) * (vp.w / 4);
    //y = Math.sin(Math.PI * 2 / max * i) * (vp.h / 4);


    var d = kc.d();

    if (d >= 0) {

        x += Math.cos(d) * 2;
        y += Math.sin(d) * 2;

    }

    vp.lookAt(x, y);

    S.ls(vp.x, vp.y, vp.w, vp.h);

    // player object
    var obj = playerObj;

    obj.x = vp.x + vp.w / 2 - obj.w / 2;
    obj.y = vp.y + vp.h / 2 - obj.h / 2;

    var pl = onPl(S.getPos(obj.x, obj.y), obj);

	currentPl = {};
    if (pl) {

        currentPl = pl;

    }

    draw();

    i += 1;
    if (i === max) {

        i = 0;

    }

};

init();
loop();
