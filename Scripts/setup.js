module.exports = async function (tp, subdirectory) {
    const title = await tp.system.prompt("Title?");
    const slug = tp.user.slugify(title);

    const fileName = `./content/${subdirectory}/${slug}/${slug}`;
    console.log(fileName);

    await tp.file.move(fileName);

    tp.user.cleanup(tp, subdirectory, fileName);

    return { title, slug };
};
