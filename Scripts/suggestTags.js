module.exports = async function (tp, { include = [] } = {}) {
  const tagify = tp.user.tagify;
  const suggestLoop = tp.user.suggestLoop;

  const vaultTags = Object.keys(tp.app.metadataCache.getTags()).map((t) =>
    t.replace(/^#/, "")
  );

  const baseChoices = ["FINISH", "NEW TAG", ...vaultTags];

  const picked = await suggestLoop(tp, baseChoices, {
    prompt: "Tag?",
    finishLabel: "FINISH",
    newLabel: "NEW TAG",
    onNew: () => tp.system.prompt("New tag?"),
  });

  return include.concat(picked.map(tagify));
};
