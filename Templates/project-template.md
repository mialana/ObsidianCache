<%*
function slugify(name) {return name.toLowerCase().replace(" ", /-/g);}

const title = "{{VALUE:Title}}";

const techStack = [];

while (true) {
  const tech = await tp.system.prompt("Tech Used? (leave blank to finish)");
  if (!tech) break;
  techStack.push(tech.trim());
}

techStackStr = techStack.map(t => `"${t}"`).join(", ");

const tags = [];

const startDateYear = tp.date.now("YYYY",0,"{{VDATE:StartDate, MMMM YYYY}}","MMMM YYYY");
const endDateYear = tp.date.now("YYYY",0,"{{VDATE:EndDate, MMMM YYYY}}","MMMM YYYY");

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

const slug = slugify(title);

const assets_dir = "contents/projects/{{VALUE:Title}}/assets"

await tp.user.mkdir({OBSIDIAN_ASSETS_DIR: assets_dir};
-%>
---
title: "{{VALUE:Title}}"
startDate: "{{VDATE:StartDate, MMMM YYYY}}"
endDate: "{{VDATE:EndDate, MMMM YYYY}}"
type: "<% await tp.system.suggester((type) => type, ["individual", "group"], false, "Category?") -%>"
category: "<% await tp.system.suggester((category) => category, ["personal", "school", "internship", "research"], false, "Category?") -%>"
demoVideoLink: "<% await tp.system.prompt("Demo Video Link? -> https://studio.youtube.com")%>"
techStack: [
	<%* tR += techStackStr; %>
]
tags: [
	<%* tR += tagsStr; -%>
]
slug: "<%* tR += slug; %>"

---

## Summary
This project is about {{VALUE:Title}}.

## Motivation

## Next Steps

## References

## Method