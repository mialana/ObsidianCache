<%*
const title = "{{VALUE:Title}}";
const slug  = tp.user.slugify(title);

const baseDir = `./content/projects/${slug}`;

await tp.file.move(`${baseDir}/${slug}`);
// Create assets directory for this project  
await tp.user.makedir({ OBSIDIAN_MAKEDIR: `${baseDir}/assets` });

const file = tp.file.find_tfile(`${baseDir}/${slug}`);
app.workspace.getLeaf("tab").openFile(file);

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
let startDate = "{{VDATE:StartDate, MMMM YYYY}}";
if (startDate == "Invalid date") startDate = "{{DATE:MMMM YYYY}}";

let endDate = "{{VDATE:EndDate, MMMM YYYY}}";
if (endDate == "Invalid date") endDate = "{{DATE:MMMM YYYY}}";

const startDateYear = tp.date.now("YYYY", 0, startDate,"MMMM YYYY");
const endDateYear = tp.date.now("YYYY", 0, startDate, "MMMM YYYY");

let include = [startDateYear];
if (endDateYear != endDateYear) include.push(endDateYear);

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