<%*
const {title, slug} = await tp.user.setup(tp, "projects");

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

// ----- dates & auto‑generated year tags -----  
// Prompt the user with natural-language date input
let startRaw = await tp.system.prompt('Start Date? (format: MONTH YEAR, e.g. "October 2021, 10/2021, 10 2021, 10-2021")');
let endRaw   = await tp.system.prompt('End Date? (format: MONTH YEAR, e.g. "October 2021, 10/2021, 10 2021, 10-2021")');

// Fallbacks if user enters nothing
if (!startRaw?.trim()) startRaw = "May 2025";
if (!endRaw?.trim()) endRaw   = "May 2025";

// Parse using moment
const startDate = moment(startRaw).format("MMMM YYYY");
const endDate   = moment(endRaw).format("MMMM YYYY");

const startDateYear = tp.date.now("YYYY", 0, startDate,"MMMM YYYY");
const endDateYear = tp.date.now("YYYY", 0, startDate, "MMMM YYYY");

let include = [startDateYear];
if (endDateYear != startDateYear) include.push(endDateYear);

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