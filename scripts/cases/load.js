// Reads cases/<id>/case.js and attaches each option's example source.
const fs = require('node:fs');
const path = require('node:path');
const { usedComponents } = require('./ods-only');

function loadCase(dir, folder) {
  const file = path.join(dir, folder, 'case.js');
  if (!fs.existsSync(file)) throw new Error(`cases/${folder} has no case.js`);
  const data = require(file);
  // Malformed options are left as they are; validateCases reports them.
  const options = !Array.isArray(data.options) ? data.options : data.options.map((option) => {
    if (!option || typeof option !== 'object' || typeof option.example !== 'string' || option.example === '') return option;
    const example = path.join(dir, folder, option.example);
    if (!fs.existsSync(example)) {
      throw new Error(`case ${data.id}: option ${option.id} example ${option.example} is missing`);
    }
    const source = fs.readFileSync(example, 'utf8');
    return { ...option, source, uses: usedComponents(source) };
  });
  const loaded = { ...data };
  if (options !== undefined) loaded.options = options;
  Object.defineProperty(loaded, 'folder', { value: folder, enumerable: false });
  return loaded;
}

function loadCases(dir) {
  const folders = fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !/^[._]/.test(e.name))
    .map((e) => e.name);
  return folders.map((folder) => loadCase(dir, folder)).sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

module.exports = { loadCases };
