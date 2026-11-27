// Structural validation for cases loaded by load.js. Collects every problem.
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const KINDS = ['rule', 'design'];
const LEVELS = ['rule', 'organism', 'page'];
const AREAS = ['agent', 'auth', 'chat', 'confirm', 'state', 'settings', 'menu', 'shell', 'dashboard', 'content', 'marketing'];

const text = (v) => typeof v === 'string' && v.trim() !== '';
const list = (v) => Array.isArray(v) && v.length > 0 && v.every(text);

function checkOption(problems, caseId, option) {
  if (!option || typeof option !== 'object') {
    problems.push(`case ${caseId}: every option must be an object`);
    return;
  }
  const at = `case ${caseId}: option ${option.id}`;
  if (!ID.test(option.id)) problems.push(`case ${caseId}: option id ${JSON.stringify(option.id)} must be lower-case words joined by hyphens`);
  for (const key of ['title', 'useWhen', 'example']) {
    if (!text(option[key])) problems.push(`${at} needs ${key}`);
  }
}

function checkCase(problems, c) {
  const at = `case ${c.id}`;
  if (!ID.test(c.id)) problems.push(`case id ${JSON.stringify(c.id)} must be lower-case words joined by hyphens`);
  if (c.folder !== undefined && c.folder !== c.id) problems.push(`${at}: folder ${c.folder} differs from the id`);
  if (!KINDS.includes(c.kind)) problems.push(`${at}: kind ${JSON.stringify(c.kind)} is not one of ${KINDS.join(', ')}`);
  if (!LEVELS.includes(c.level)) problems.push(`${at}: level ${JSON.stringify(c.level)} is not one of ${LEVELS.join(', ')}`);
  if (!AREAS.includes(c.area)) problems.push(`${at}: area ${JSON.stringify(c.area)} is not one of ${AREAS.join(', ')}`);
  for (const key of ['title', 'situation']) {
    if (!text(c[key])) problems.push(`${at} needs ${key}`);
  }
  if (c.notBuiltYet !== undefined && !text(c.notBuiltYet)) problems.push(`${at}: notBuiltYet must be a non-empty string`);
  if (!Array.isArray(c.seenIn) || c.seenIn.length === 0) {
    problems.push(`${at}: seenIn needs at least one entry`);
  } else {
    c.seenIn.forEach((s, i) => {
      if (!s || !text(s.product)) problems.push(`${at}: seenIn[${i}] needs product`);
    });
  }
  if (c.kind === 'rule') {
    for (const key of ['answer', 'why']) {
      if (!text(c[key])) problems.push(`${at} needs ${key}`);
    }
    for (const key of ['do', 'dont']) {
      if (!list(c[key])) problems.push(`${at} needs ${key}, a non-empty list of text`);
    }
    if (c.options !== undefined) problems.push(`${at}: a rule has no options`);
  } else if (c.kind === 'design') {
    const options = c.options;
    if (!Array.isArray(options) || options.length < 2 || options.length > 4) {
      problems.push(`${at} needs 2 to 4 options`);
      return;
    }
    const seen = new Set();
    for (const option of options) {
      const id = option && option.id;
      if (seen.has(id)) problems.push(`${at}: duplicate option id ${id}`);
      seen.add(id);
      checkOption(problems, c.id, option);
    }
  }
}

function validateCases(cases) {
  const problems = [];
  const seen = new Set();
  for (const c of cases) {
    if (seen.has(c.id)) problems.push(`duplicate case id ${c.id}`);
    seen.add(c.id);
    checkCase(problems, c);
  }
  if (problems.length > 0) throw new Error(`cases are invalid:\n- ${problems.join('\n- ')}`);
}

module.exports = { validateCases };
