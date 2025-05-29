module.exports = function (tp) {
  tp.hooks.on_all_templates_executed(async () => {
    const path = tp.file.path(true);
    const pathTFile = tp.file.find_tfile(path);
    app.workspace.getLeaf("tab").openFile(pathTFile);
  });
};
