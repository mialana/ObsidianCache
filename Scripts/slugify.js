module.exports = function (str = "") {
    return str.trim().replace(/ /g, "_");
};
