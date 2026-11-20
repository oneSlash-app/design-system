// Color helpers for the token generator.

function parseHex(hex) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex);
  if (!m) throw new Error(`${hex} is not a hex color`);
  let h = m[1];
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function hexToChannels(hex) {
  return parseHex(hex).join(' ');
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// OKLab conversions (Björn Ottosson's matrices), used to change a color's lightness and keep its hue.
const toLinear = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function toOklab(hex) {
  const [r, g, b] = parseHex(hex).map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}

// Linear sRGB channels for an OKLab color; outside 0..1 means outside sRGB.
function fromOklab([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}

const lightness = (hex) => toOklab(hex)[0];

// The color with OKLab lightness `l` (0..1) and the same hue. Chroma is kept, and reduced
// only as far as needed to stay inside sRGB.
function withLightness(hex, l) {
  const [r, g, bl] = parseHex(hex);
  // A neutral gray has no hue; without this the conversion's rounding tints it by one step.
  const [, a, b] = r === g && g === bl ? [0, 0, 0] : toOklab(hex);
  const EPS = 1e-4;
  const inGamut = (k) => fromOklab([l, a * k, b * k]).every((c) => c >= -EPS && c <= 1 + EPS);
  let keep = 1;
  if (!inGamut(1)) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(mid)) lo = mid; else hi = mid;
    }
    keep = lo;
  }
  const rgb = fromOklab([l, a * keep, b * keep]).map((c) => Math.round(toGamma(Math.min(1, Math.max(0, c))) * 255));
  return `#${rgb.map((v) => v.toString(16).toUpperCase().padStart(2, '0')).join('')}`;
}

module.exports = { parseHex, hexToChannels, contrastRatio, lightness, withLightness };
