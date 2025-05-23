<%*
function deslugify(name) {return name.replace(/-/g, " ");}
const title = deslugify("{{NAME}}");

const techStack = [];

while (true) {
  const tech = await tp.system.prompt("Tech Used? (leave blank to finish)");
  if (!tech) break;
  techStack.push(tech.trim());
}

techStackStr = techStack.map(t => `"${t}"`).join(", ");

const tags = [];

const startDateYear = tp.date.now("YYYY",0,"{{VDATE:startDate, MMMM YYYY}}","MMMM YYYY");
const endDateYear = tp.date.now("YYYY",0,"{{VDATE:endDate, MMMM YYYY}}","MMMM YYYY");

tags.push(startDateYear);
if (endDateYear !== startDateYear) {
  tags.push(endDateYear);
}

while (true) {
  const tag = await tp.system.prompt("Tag? (leave blank to finish)");
  if (!tag) break;
  tags.push(tag.trim());
}

tagsStr = tags.map(t => `"${t}"`).join(", ");
-%>

---
title: "<%* tR += title; %>"
startDate: "{{VDATE:startDate, MMMM YYYY}}"
endDate: "{{VDATE:endDate, MMMM YYYY}}"
description: "This project is about <%* tR += title; %>"
techStack: [
	<%* tR += techStackStr; %>
]
tags: [
	<%* tR += tagsStr; %>
]
slug: {{NAME}}

---