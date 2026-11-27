import React from 'react';

interface ImageProps {
  src: string;
  /** Required. Use "" for an image that only decorates. */
  alt: string;
  /** Pixel size of the file. Set both so the browser keeps the space before the image loads. */
  width?: number;
  height?: number;
  /** How the image fills its box. Not set, the browser default applies. Inside a `Figure` with `crop`, the figure fills the frame and `fit` has no effect. */
  fit?: 'cover' | 'contain';
  loading?: 'lazy' | 'eager';
}

const fits = { cover: 'object-cover', contain: 'object-contain' };

export default function Image({ src, alt, width, height, fit, loading }: ImageProps) {
  return <img src={src} alt={alt} width={width} height={height} loading={loading} className={fit ? fits[fit] : undefined} />;
}
