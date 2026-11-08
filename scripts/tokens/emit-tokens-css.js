const { HEADER } = require('./emit-theme');

function emitTokensCss(tokens) {
  const groups = [
    ['radius', tokens.radius],
    ['shadow', tokens.shadow],
    ['z', tokens.zIndex],
    ['duration', tokens.motion.duration],
    ['ease', tokens.motion.easing],
    ['spacing', tokens.spacing],
    ['measure', tokens.measure],
    ['container', tokens.container],
    ['stage', tokens.stage],
  ];
  const lines = [];
  for (const [prefix, values] of groups) {
    for (const [key, value] of Object.entries(values)) lines.push(`  --os-${prefix}-${key}: ${value};`);
  }
  return `${HEADER}\n:root {\n${lines.join('\n')}\n}\n`;
}

module.exports = { emitTokensCss };
