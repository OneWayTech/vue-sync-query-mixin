/* eslint-disable */
String.prototype.endsWith = String.prototype.endsWith || function (target) {
  target = '' + target;

  var me = this.toString(),
    myLen = me.length,
    targetLen = target.length;

  if (myLen < targetLen) return false;

  return me.lastIndexOf(target) === myLen - targetLen;
};
/* eslint-disable */
