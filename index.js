const fs = require("fs");
const { basePath, packPath } = require("./config.js");

const generators = [require("./generators/colorcube.js")];

async function main() {
	for (const gen of generators) {
		const data = await gen();
		console.log(data);

		let arr = data;
		if (!Array.isArray(data)) arr = [data];

		const worldDir = basePath.split("/");
		for (let i = 1; i < worldDir.length; i++) {
			let path = worldDir.slice(0, i + 1).join("/");
			const fullPath = `${path}`;
			if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
		}

		// Generate pack.mcmeta
		fs.writeFileSync(
			`${packPath}pack.mcmeta`,
			JSON.stringify(
				{
					pack: {
						pack_format: 1,
						description: "Hiya",
					},
				},
				null,
				2
			)
		);

		// Generat eall functions
		for (const { commands, functionName } of arr) {
			if (!functionName) continue;

			let dir = functionName.split("/").slice(0, -1).filter(Boolean);
			for (let i = 0; i < dir.length; i++) {
				let path = dir.slice(0, i + 1).join("/");
				const fullPath = `${basePath}${path}`;

				if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
			}

			fs.writeFileSync(
				`${basePath}${functionName}.mcfunction`,
				commands.join("\n")
			);
		}
	}
}

main();
