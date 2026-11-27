import React from 'react';
var fits = { cover: 'object-cover', contain: 'object-contain' };
export default function Image(_a) {
    var src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, fit = _a.fit, loading = _a.loading;
    return <img src={src} alt={alt} width={width} height={height} loading={loading} className={fit ? fits[fit] : undefined}/>;
}
