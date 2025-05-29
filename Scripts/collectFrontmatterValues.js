module.exports = async function (tp, field) {
    const set = new Set();

    for (const file of tp.app.vault.getMarkdownFiles()) {
        const fm = tp.app.metadataCache.getFileCache(file)?.frontmatter;
        if (Array.isArray(fm?.[field])) fm[field].forEach((v) => set.add(v));
    }
    return Array.from(set).sort();
};
