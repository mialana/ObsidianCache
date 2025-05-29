<%*
const {title, slug} = await tp.user.setup(tp, "projects");

const {startDate, endDate, tagsInclude} = await tp.user.handleProjectDates(tp);

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
const tagsArr = await tp.user.suggestTags(tp, { include: tagsInclude });  
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