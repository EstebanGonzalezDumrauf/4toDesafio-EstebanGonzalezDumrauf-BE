// const fileURLToPath = require('url');
// const dirname = require('path');

// const __fileName = fileURLToPath(import.meta.url);
// const __dirName = dirname(__fileName);

// module.exports = __dirName;

const { dirname } = require('path');

const __dirName = dirname(__filename);

module.exports = __dirName;