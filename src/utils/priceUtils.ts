export const TwoDecimalPlaces = function toDecimal2(f: number) {
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(f * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}


