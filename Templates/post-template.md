<%* 

const {title, slug} = await tp.user.setup(tp, "posts");

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