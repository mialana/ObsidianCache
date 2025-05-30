module.exports = async function (tp, subdirectory) {
    const title = await tp.system.prompt("Title?");
    let slug = await tp.system.prompt("Slug? Press enter to auto-generate.");
    if (slug == "") slug = tp.user.slugify(title);

    const fileName = `./content/${subdirectory}/${slug}/index`;

    await tp.file.move(fileName);

    tp.user.cleanup(tp, subdirectory, fileName);

    return { title, slug };
};
