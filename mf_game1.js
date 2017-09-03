
// player ships
var ps,
es,
currentPl = {};
lastFire = new Date();

// my "on planet" method
var onPl = function (sec, obj) {

    var i;
    if (sec) {

        if (sec.pl) {

            i = sec.pl.length;
            while (i--) {

                if (_.b(sec.pl[i], obj)) {

                    return sec.pl[i];

                }

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
        id : 'home',
        po : false

    });
    sec.pl.push({

        x : -230,
        y : -128,
        w : 32,
        h : 32,
        id : 'moon',
        po : false

    });

    // the New Player Ship Collection that will replace playerObj, and pShots
    ps = new ShipCollection({
            faction : 'p',
            max : 1
        });

    // add the single player ship
    ps.addShip();

    es = new ShipCollection({
            faction : 'e',
            ai : true,
            max : 5
        });

    // set enemy collections for each collection
    ps.enemys = es;
    es.enemys = ps;

    es.addShip({

        x : 200

    });

    _.l(ps);
    _.l(es);

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

            if (sec.pl.length > 0) {

                sec.pl.forEach(function (pl) {

                    pl = vp.makeVPRel(pl);

                    ctx.strokeStyle = '#00ffff';
                    ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);

                });

            }

        });

    });

    // draw ships
    C.hiDraw(function (ctx) {

        // player ships
        ps.units.forEach(function (ship) {

            var obj = _.c(ship),

            pos = vp.makeVPRel(obj);

            obj.x = pos.x;
            obj.y = pos.y;

            C.drawInfo([obj.a], 50, 20)

            C.dBX(obj);

            /*
            C.dBX({

            x:ship.x,
            y:ship.y,
            w:ship.w,
            h:ship.h,
            hw : ship.hw,
            hh : 16,
            a:ship.a,

            s: '#ffffff',
            f: '#000000',
            i:3

            });
             */

        });

        // enemy ships
        es.units.forEach(function (ship) {

            var obj = _.c(ship),

            pos = vp.makeVPRel(obj);

            obj.x = pos.x;
            obj.y = pos.y;

            C.drawInfo([obj.a], 50, 20)

            C.dBX(obj);

            /*
            var obj = vp.makeVPRel(ship);

            ctx.strokeStyle = '#ff0000';
            ctx.fillStyle = '#ff0000';
            ctx.textBaseline = 'top';
            ctx.font = '10px courier';
            ctx.strokeRect(obj.x, obj.y, obj.w, obj.h);
             */
            //ctx.fillText(ship.hp, obj.x, obj.y);
            C.drawInfo(
                [

                    'hp:' + ship.hp,
                    'a: ' + ship.a,
                    //'target: ' + (ship.target ? ship.target : false)
                    'dtt: ' + Math.floor(ship.dtt),
                    'adt: ' + ship.adt.toFixed(2),
                    'aDir: ' + ship.aDir,
                    'turnPer: ' + ship.turnPer.toFixed(2),
                    'maxTurn: ' + ship.maxTurn.toFixed(2),
                    'aDelta: ' + ship.aDelta.toFixed(2)

                ],

                obj.x, obj.y, 12, '12px courier', '#ff8888');

        });

    });

    // draw shots
    C.hiDraw(function (ctx) {

        // player shots
        ps.shots.units.forEach(function (sh) {

            var obj = vp.makeVPRel(sh);

            ctx.fillStyle = '#00afff';
            ctx.fillRect(obj.x, obj.y, obj.w, obj.h);

        });

    });

    C.drawInfo([currentPl.id || '']);

},

x = 0, y = 0, i = 0, max = 1250,
loop = function () {

    requestAnimationFrame(loop);

    // player object
    var obj = ps.units[0];

    var d = kc.d();

    if (d >= 0) {

        // new _.asd method works great
        if (_.asd(obj.a, d) == -1) {

            obj.a -= Math.PI / 100;

        } else {

            obj.a += Math.PI / 100;
        }

        obj.step();
    }

    vp.lookAt(x, y);

    S.ls(vp.x, vp.y, vp.w, vp.h);

    vp.x = obj.x - vp.w / 2;
    vp.y = obj.y - vp.h / 2;

    // fire shots
    if (kc.keys[186]) {

        obj.shoot();

    }

    // get planet
    var pl = onPl(S.getPos(obj.x, obj.y), obj);

    currentPl = {};
    if (pl) {

        currentPl = pl;

    }

    ps.update();
    es.update();

    draw();

    i += 1;
    if (i === max) {

        i = 0;

    }

};

init();
loop();
