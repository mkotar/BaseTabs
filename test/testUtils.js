
Function.prototype.clone = function() {
    var cloneObj = this;
    if(this.__isClone) {
        cloneObj = this.__clonedFrom;
    }

    var temp = function() { return cloneObj.apply(this, arguments); };
    for(var key in this) {
        temp[key] = this[key];
    }

    temp.__isClone = true;
    temp.__clonedFrom = cloneObj;

    return temp;
};

function clone(obj) {
    if ('function' === typeof obj) {
        return obj.clone();
    }
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = {};

    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }

    return temp;
}/**
 * Created by dkrawc on 10.12.13.
 */
