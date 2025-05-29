<%*
function deslugify(title) {return title.trim().replace("-"," ");}
function tagify(tag) {return tag.trim().replace(" ", "_");}

const slug = "{{VALUE:Slug}}";
const title = deslugify(slug);

const assets_dir = "./content/projects/{{VALUE:Slug}}/assets";
await tp.user.makedir({OBSIDIAN_ASSETS_DIR: assets_dir});

const type = await tp.system.suggester((type) => type, ["individual", "group"], false, "Type?");

const category = await tp.system.suggester((category) => category, ["personal", "school", "internship", "research"], false, "Category?");

const demoVideoLink = await tp.system.prompt("Demo Video Link? -> https://studio.youtube.com");

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

let choices = ["NEW TAG", "CANCEL"].concat(
Object.keys(app.metadataCache.getTags()).map(x => x.replace("#", "")));

while (true) {
  let tag = await tp.system.suggester(item => item, choices, false, "Tag?", 10)
  if (!tag || tag == "CANCEL") break;
  if (tag == "NEW TAG") {
    tag = await tp.system.prompt("New Tag?");
  }
  
  tags.push(tagify(tag));
  const index = choices.indexOf(tag);
  if (index != -1) {
    choices.splice(choices.indexOf(tag), 1);
  }
}

tagsStr = tags.map(t => `"${t}"`).join(", ");
-%>
---
title: "<%* tR += title; %>"
startDate: "{{VDATE:StartDate, MMMM YYYY}}"
endDate: "{{VDATE:EndDate, MMMM YYYY}}"
type: "<%* tR += type; -%>"
category: "<%* tR += category; -%>"
demoVideoLink: "<%* tR += demoVideoLink; %>"
techStack: [
	<%* tR += techStackStr; %>
]
tags: [
	<%* tR += tagsStr; %>
]
slug: "<%* tR += slug; %>"

---

## Summary
This project is about <%* tR += title; %>.

## Motivation

## Next Steps

## References

## Method