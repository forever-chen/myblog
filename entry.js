const path = require('path');
function entry(){
	return {
		index:path.resolve("./js/index.js"),
        pages:path.resolve("./js/pages.js"),
	}
}
module.exports = entry;