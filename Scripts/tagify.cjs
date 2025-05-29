module.exports = function (raw = "") {
  return raw
    .trim()
    .split(" ")
    .map((w) =>
      w === w.toUpperCase() && w.length > 0
        ? w // keep “AI”, “2D”, “VR”
        : w.charAt(0).toLowerCase() + w.slice(1)
    )
    .join("_");
};
