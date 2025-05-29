module.exports = function (tag = "") {
  return tag.trim().replace(/ /g, "_");
};
