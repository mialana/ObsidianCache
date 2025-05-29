<%* 
function slugify(title) {return title.trim().replace(/ /g,"-");}

const title = await tp.system.prompt("Enter note title");
const slug = slugify(title);

tp.file.move("./content/posts/" + slug);

const creationDate = tp.date.now("YYYY-MM-DD HH:MM:SS");
-%>

---
title: "<%* tR += title; %>"
slug: "<%* tR += slug; %>"

---