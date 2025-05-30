module.exports = async function (tp) {
    const nldatesPlugin = tp.app.plugins.getPlugin("nldates-obsidian");
    // Prompt the user with natural-language date input
    const startInput = await tp.system.prompt("Start Date?");
    let startDateObj = nldatesPlugin.parseDate(startInput);
    if (startDateObj.formattedString == "Invalid date") {
        startDateObj = nldatesPlugin.parseDate("now");
    }
    const startDate = startDateObj.moment.format("YYYY-MM-DD");
    const startDateYear = startDateObj.moment.format("YYYY");

    const endInput = await tp.system.prompt("End Date?");
    let endDateObj = nldatesPlugin.parseDate(endInput);
    if (endDateObj.formattedString == "Invalid date") {
        endDateObj = nldatesPlugin.parseDate("now");
    }
    const endDate = endDateObj.moment.format("YYYY-MM-DD");
    const endDateYear = endDateObj.moment.format("YYYY");
    

    let tagsInclude = [startDateYear];
    if (endDateYear != startDateYear) tagsInclude.push(endDateYear);

    return { startDate, endDate, tagsInclude };
};
