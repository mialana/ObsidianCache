module.exports = async function (tp, subdirectory) {
  const title = await tp.system.prompt("Title?");
  const slug = tp.user.slugify(title);

  const fileName = `./content/${subdirectory}/${slug}/${slug}`;

  await tp.file.move(fileName);

  return { title, slug };
};
