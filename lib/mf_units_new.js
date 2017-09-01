var Unit = function (obj) {

    this.x = obj.x || -16;
    this.y = obj.y || -16;
    this.w = obj.w || 32;
    this.h = obj.h || 32;
    this.a = obj.a || 0;

};

var UnitCollection = function (obj) {

    this.units = obj.units || [];

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
