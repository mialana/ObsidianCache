module.exports = async function (tp, { include = [] } = {}) {
  const tagify = require("./tagify");
  const suggestLoop = require("./suggestLoop");

  const vaultTags = Object.keys(tp.app.metadataCache.getTags()).map((t) =>
    t.replace(/^#/, "")
  );

  const baseChoices = ["FINISH", "NEW TAG", ...include, ...vaultTags];

  const picked = await suggestLoop(tp, baseChoices, {
    prompt: "Tag?",
    finishLabel: "FINISH",
    newLabel: "NEW TAG",
    onNew: () => tp.system.prompt("New tag?"),
  });

  return picked.map(tagify);
};
