const blockData = require("../hiya/blocks.json");

function getClosestColor(r, g, b) {
	let closest = null;
	let closestDist = Infinity;
	for (const block of blockData) {
		const dist =
			Math.abs(r - block.rgb[0]) +
			Math.abs(g - block.rgb[1]) +
			Math.abs(b - block.rgb[2]);
		if (dist < closestDist) {
			closestDist = dist;
			closest = block;
		}
	}
	return closest;
}

module.exports = () => {
	const commands = [];
	const size = 70;
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			for (let z = 0; z < size; z++) {
				const r = Math.floor((x / size) * 255);
				const g = Math.floor((y / size) * 255);
				const b = Math.floor((z / size) * 255);
				const block = getClosestColor(r, g, b);
				commands.push(
					`setblock ~${x * 2} ~${y * 2} ~${z * 2} minecraft:${block.block}`
				);
				commands.push(
					`setblock ~${x * 2/} ~${y * 2 - 1} ~${z * 2} minecraft:barrier keep`
				);
			}
		}
		console.log(x / size);
	}

	return {
		functionName: "colorcube",
		commands,
	};
};
