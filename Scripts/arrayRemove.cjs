module.exports = function (arr = [], item) {
  const i = arr.indexOf(item);
  if (i !== -1) arr.splice(i, 1);
  return arr;
};
