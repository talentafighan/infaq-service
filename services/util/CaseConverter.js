module.exports = {
  SnakeToCamel(snakeCaseObject) {
    var resultObject = {};
    for (d in snakeCaseObject) {
      if (snakeCaseObject.hasOwnProperty(d)) {
        resultObject[
          d.replace(/(\_\w)/g, function (k) {
            return k[1].toUpperCase();
          })
        ] = snakeCaseObject[d];
      }
    }
    return resultObject;
  },
};
