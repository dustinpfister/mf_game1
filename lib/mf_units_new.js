var Unit = function (obj) {

    obj = obj || {};

    // position and size
    this.x = obj.x || -16;
    this.y = obj.y || -16;
    this.w = obj.w || 32;
    this.h = obj.h || 32;

    // angle
    this.a = obj.a || 0;
    this.delta = 5;

    // hit points
    this.maxHP = obj.maxHP || 100;
    this.hp = this.maxHP;

};

Unit.prototype.step = function () {

    this.x += Math.cos(this.a) * this.delta;
    this.y += Math.sin(this.a) * this.delta;

};

var UnitCollection = function (obj) {

    obj = obj || {};

    this.units = obj.units || [];
    this.max = 10;

};

// check if the given unit collides with any unit in the collection, if so return that
// unit from the collection
UnitCollection.prototype.collidesWith = function (unit) {

    var i = this.units.length;
    while (i--) {

        if (_.b(this.unit[i], unit)) {

            return this.unit[i];

        }

    }

    return false;
};

// purge all units that have an hp value of 0 or lower
UnitCollection.prototype.purgeDead = function () {

    var i = this.units.length;
    while (i--) {

        if (this.units[i].hp <= 0) {

            // purge
            this.units.splice(i, 1);

        }

    }

};

// push in a new unit if we have not reached the max
UnitCollection.prototype.add = function (unit) {

    unit = unit || new Unit();

    _.l('yes');

    if (this.units.length < this.max) {

        this.units.push(unit);

    }

}

var Shot = function (obj) {

    Unit.call(this, obj);

    this.life = 100;
    this.damage = 1;

};

Shot.prototype = new Unit();

var ShotCollection = function (obj) {

    UnitCollection.call(this, obj);

};

ShotCollection.prototype = new UnitCollection();

ShotCollection.prototype.step = function () {

    var i = this.units.length,
    sh;
    while (i--) {

        sh = this.units[i];

        sh.step();

        sh.hp -= 1;

        if (sh.hp < 0) {

            sh.hp = 0;
        }

    }

    this.purgeDead();

}
