function includes(arr, ...args) {
    if (!arr) return false;
    for (let a of args) {
        if (arr.indexOf(a) >= 0) {
            return true;
        }
    }
    return false;
}

function camelCaseToDash( myStr ) {
    return myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
}

module.exports = {
    includes,
    camelCaseToDash
}