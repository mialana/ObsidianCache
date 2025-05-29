<%*
const {title, slug} = await tp.user.setup(tp, "projects");

// Prompt the user with natural-language date input
let startRaw = await tp.system.prompt("Start Date? (format: MM YYYY)");
if (!startRaw?.trim() || startRaw == "Invalid date") startRaw = "May 2025";
// Parse using moment
const startDate = moment(startRaw, "MM YYYY").format("MMMM YYYY");

let endRaw   = await tp.system.prompt("End Date? (format: MM YYYY)");
if (!endRaw?.trim() || endRaw == "Invalid date") endRaw = "May 2025";
const endDate = await moment(endRaw, "MM YYYY").format("MMMM YYYY");

console.log(startDate);
console.log(endDate);
// ----- dates & auto‑generated year tags ---
const startDateYear = moment(startDate, "MMMM YYYY").format("YYYY");
const endDateYear   = moment(endDate,   "MMMM YYYY").format("YYYY");

let include = [startDateYear];
if (endDateYear != startDateYear) include.push(endDateYear);

// ----- basic frontmatter fields -----  
const type = await tp.system.suggester(x => x, ["individual", "group"], false, "Type?");  
const category = await tp.system.suggester(x => x, ["personal", "school", "internship", "research"], false, "Category?");  
const demoVideoLink = await tp.system.prompt("Demo Video Link?");

// ----- tech stack picker -----  
const techChoices = ["FINISH", "NEW TECH", ...(await tp.user.collectFrontmatterValues(tp, "techStack"))];

const techStackRaw = await tp.user.suggestLoop(tp, techChoices, {  
prompt: "Tech Used?",
newLabel: "NEW TECH",  
onNew: () => tp.system.prompt("New Tech?")  
});

const techStack = techStackRaw.map(tp.user.tagify);  
const techStackStr = techStack.map(t => `"${t}"`).join(", ");

// ----- tag picker (includes the two years) -----  
const tagsArr = await tp.user.suggestTags(tp, { include: include });  
const tagsStr = tagsArr.map(t => `"${t}"`).join(", ");
_%>

---
title: "<%* tR += title %>"  
slug: "<%* tR += slug %>"  
startDate: "<%* tR += startDate; %>"
endDate: "<%* tR += endDate; %>"
type: "<%* tR += type %>"  
category: "<%* tR += category %>"  
demoVideoLink: "<%* tR += demoVideoLink %>"  
techStack: [ 
    <%* tR += techStackStr %> 
]  
tags: [ 
	<%* tR += tagsStr %>
] 
description: "This project is about <%* tR += title _%>."

---

## Summary

## Motivation

## Next Steps

## References

## Method