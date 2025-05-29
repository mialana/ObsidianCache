<%* 
const title = "{{VALUE:Title}}";
const slug = tp.user.slugify(title);

const fileName = `./content/posts/${slug}/${slug}`;
await tp.file.move(fileName);

const file = tp.file.find_tfile(fileName);
app.workspace.getLeaf("tab").openFile(file);

const creationDate = tp.date.now("YYYY-MM-DD HH:mm:ss");

const tagsArr = await tp.user.suggestTags(tp);
const tagsStr = tagsArr.map(t => `"${t}"`).join(", ");
-%>

---
title: "<%* tR += title; %>"
slug: "<%* tR += slug; %>"
creationDate: "<%* tR += creationDate; %>"
tags: [ <%* tR += tagsStr %> ]

---