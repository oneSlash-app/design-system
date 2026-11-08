import React from 'react';
var radii = { control: 'rounded-control', container: 'rounded-container' };
export default function Figure(_a) {
    var children = _a.children, caption = _a.caption, crop = _a.crop, _b = _a.paper, paper = _b === void 0 ? false : _b, _c = _a.radius, radius = _c === void 0 ? 'container' : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var frame = paper ? "bg-background-paper p-large md:p-xlarge ".concat(radii[radius]) : "overflow-hidden ".concat(radii[radius]);
    return (<figure className={"flex flex-col gap-medium ".concat(className)}>
      {crop ? (<div className={"relative overflow-hidden ".concat(radii[radius], " [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover")} style={{ aspectRatio: crop }}>
          {children}
        </div>) : (<div className={frame}>{children}</div>)}
      {caption && <figcaption className="text-body2 text-fg-secondary">{caption}</figcaption>}
    </figure>);
}
