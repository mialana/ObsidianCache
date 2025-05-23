<%*
function deslugify(name) {return name.replace(/-/g, " ");}
const title = deslugify("{{NAME}}");

const tags = [];

while (true) {
  const tag = await tp.system.prompt("Tag? (leave blank to finish)");
  if (!tag) break;
  tags.push(tag.trim());
}

tagsStr = tags.map(t => `"${t}"`).join(", \n");
-%>

---
title: "<%* tR += title; %>"
startDate: "{{VDATE:startDate, MMMM YYYY}}"
endDate: "{{VDATE:endDate, MMMM YYYY}}"
description: "This project is about <%* tR += title; %>"
tags: [
"<% tp.date.now("YYYY",0,"{{VDATE:startDate, MMMM YYYY}}","MMMM YYYY") %>",
"<% tp.date.now("YYYY",0,"{{VDATE:endDate, MMMM YYYY}}","MMMM YYYY") %>",
<%* tR += tagsStr; %>
]
slug: {{NAME}}

---