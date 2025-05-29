module.exports = function (tp, subdirectory, fileName) {
    // Create callback for after all other ts commands have executed
    tp.hooks.on_all_templates_executed(async () => {
        const pathTFile = tp.file.find_tfile(fileName);
        app.workspace.getLeaf(false).openFile(pathTFile);

        if (subdirectory == "projects") {
            const fileDir = fileName.substr(0, fileName.lastIndexOf("/"));

            // Create assets directory for new project pages
            tp.user.makedir({ OBSIDIAN_MAKEDIR: `${fileDir}/assets` });
        }
    });
};
