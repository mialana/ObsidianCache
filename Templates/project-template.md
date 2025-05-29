<%*
function getPastTechStack() {
  const allFiles = app.vault.getMarkdownFiles();
  const techs = new Set();

  for (let file of allFiles) {
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache?.frontmatter;
    if (frontmatter?.techStack && Array.isArray(frontmatter.techStack)) {
      frontmatter.techStack.forEach(t => techs.add(t));
    }
  }

  return Array.from(techs).sort();
}

function remove(arr, item) {
  const index = arr.indexOf(item);
  if (index != -1) {
    arr.splice(index, 1);
  }
}

function deslugify(title) {return title.trim().replace(/-/g," ");}
function tagify(tag) {return tag.trim().replace(/ /g, "_");}

const slug = "{{VALUE:Slug}}";
const title = deslugify(slug);

const assets_dir = "./content/projects/{{VALUE:Slug}}/assets";
await tp.user.makedir({OBSIDIAN_ASSETS_DIR: assets_dir});

const type = await tp.system.suggester((type) => type, ["individual", "group"], false, "Type?");

const category = await tp.system.suggester((category) => category, ["personal", "school", "internship", "research"], false, "Category?");

const demoVideoLink = await tp.system.prompt("Demo Video Link?");

let techChoices = ["FINISH", "NEW TECH"].concat(getPastTechStack());
const techStack = [];

while (true) {
  let tech = await tp.system.suggester(item => item, techChoices, false, "Tech Used?");
  if (!tech || tech == "FINISH") break;
  if (tech == "NEW TECH") {
    tech = await tp.system.prompt("New Tech?");
  }
  techStack.push(tagify(tech));
  remove(techChoices, tech);
}

techStackStr = techStack.map(t => `"${t}"`).join(", ");

const tags = [];

let startDate = "{{VDATE:StartDate, MMMM YYYY}}";
let endDate = "{{VDATE:EndDate, MMMM YYYY}}";
if (startDate == "Invalid date") startDate = "{{DATE:MMMM YYYY}}";
if (endDate == "Invalid date") endDate = "{{DATE:MMMM YYYY}}";
const startDateYear = tp.date.now("YYYY", 0, startDate,"MMMM YYYY");
const endDateYear = tp.date.now("YYYY", 0, startDate, "MMMM YYYY");

tags.push(startDateYear);
if (endDateYear !== startDateYear) {
  tags.push(endDateYear);
}

let tagChoices = ["FINISH", "NEW TAG"].concat(
Object.keys(app.metadataCache.getTags()).map(x => x.replace("#", "")));

while (true) {
  let tag = await tp.system.suggester(item => item, tagChoices, false, "Tag?", 10)
  if (!tag || tag == "FINISH") break;
  if (tag == "NEW TAG") {
    tag = await tp.system.prompt("New Tag?");
  }
  
  tags.push(tagify(tag));
  remove(tagChoices, tag);
}

tagsStr = tags.map(t => `"${t}"`).join(", ");
-%>
---
title: "<%* tR += title; %>"
slug: "<%* tR += slug; %>"
startDate: "<%* tR += startDate; %>"
endDate: "<%* tR += endDate; %>"
type: "<%* tR += type; -%>"
category: "<%* tR += category; -%>"
demoVideoLink: "<%* tR += demoVideoLink; %>"
techStack: [
	<%* tR += techStackStr; %>
]
tags: [
	<%* tR += tagsStr; %>
]
description: This project is about <%* tR += title; %>.
---

## Summary

## Motivation

## Next Steps

## References

## Method