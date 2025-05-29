module.exports = async function (
    tp,
    choices,
    {
        prompt = "Select item",
        finishLabel = "FINISH",
        newLabel = "NEW",
        limit = 10,
        onNew = async () => tp.system.prompt("New value?"),
    } = {}
) {
    const remove = tp.user.arrayRemove;
    const picked = [];

    while (true) {
        let val = await tp.system.suggester(
            (x) => x,
            choices,
            false,
            prompt,
            limit
        );
        if (!val || val === finishLabel) break;

        if (val === newLabel) val = await onNew();
        picked.push(val);
        remove(choices, val);
    }
    return picked;
};
