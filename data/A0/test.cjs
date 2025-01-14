const fs = require('node:fs');

fs.readFile('A0-Lrepeat.json','utf-8', (err, data) => {
	console.log(data)
});