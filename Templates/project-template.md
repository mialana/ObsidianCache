<%\*
function deslugify(name) {return name.replace(/-/g, " ");}
const title = deslugify("{{NAME}}");

const tags = [];

const startDateYear = tp.date.now("YYYY",0,"{{VDATE:startDate, MMMM YYYY}}","MMMM YYYY");
const endDateYear = tp.date.now("YYYY",0,"{{VDATE:endDate, MMMM YYYY}}","MMMM YYYY");

while (true) {
const tag = await tp.system.prompt("Tag? (leave blank to finish)");
if (!tag) break;
tags.push(tag.trim());
}

tagsStr = tags.map(t => `"${t}"`).join(", \n");
-%>

---

title: "<%_ tR += title; %>"
startDate: "{{VDATE:startDate, MMMM YYYY}}"
endDate: "{{VDATE:endDate, MMMM YYYY}}"
description: "This project is about <%_ tR += title; %>"
tags: [
"<% tp.date.now("YYYY",0,"{{VDATE:startDate, MMMM YYYY}}","MMMM YYYY") %>",
"<% tp.date.now("YYYY",0,"{{VDATE:endDate, MMMM YYYY}}","MMMM YYYY") %>",
<%* tR += tagsStr; %>
]
slug: {{NAME}}

---
