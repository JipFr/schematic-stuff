const fs = require("fs");
const color_data = JSON.parse(fs.readFileSync("./color_data.json"));

const banned = ["side", "top", "bottom", "front", "front", "back"];

const blocks = Object.values(color_data);
const viableOptions = blocks.filter((block) => !block.is_decoration);
const monoBlocks = viableOptions.filter((block) => {
	return !banned.find((bannedWord) =>
		block.display_name.toLowerCase().includes(bannedWord)
	);
});

console.log(viableOptions.length, monoBlocks.length);
console.log(monoBlocks);
