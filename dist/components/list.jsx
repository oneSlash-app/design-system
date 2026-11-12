import React from 'react';
var sizes = { body1: 'text-body1', body2: 'text-body2' };
var tones = { primary: 'text-fg-primary', secondary: 'text-fg-secondary' };
// Markers are the browser's own, set outside the text so a wrapped line stays
// aligned; they take the list's text color, so they follow `tone`.
var markers = { dot: 'list-disc pl-xlarge', number: 'list-decimal pl-xlarge' };
// A list, one line of text per item, a little apart. `marker` puts a dot or a
// number before each item; numbers use an <ol>.
export default function List(_a) {
    var items = _a.items, _b = _a.size, size = _b === void 0 ? 'body2' : _b, _c = _a.tone, tone = _c === void 0 ? 'primary' : _c, _d = _a.marker, marker = _d === void 0 ? 'none' : _d, _e = _a.className, className = _e === void 0 ? '' : _e;
    var Tag = marker === 'number' ? 'ol' : 'ul';
    var markerClass = marker === 'none' ? '' : "".concat(markers[marker], " ");
    return (<Tag className={"flex flex-col gap-medium ".concat(markerClass).concat(sizes[size], " ").concat(tones[tone], " ").concat(className)}>
      {items.map(function (item, i) { return (<li key={i}>{item}</li>); })}
    </Tag>);
}
