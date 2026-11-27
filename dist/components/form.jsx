'use client';
import React from 'react';
var gaps = {
    small: 'gap-small',
    medium: 'gap-medium',
    large: 'gap-large',
    xlarge: 'gap-xlarge',
    xxlarge: 'gap-xxlarge',
    huge: 'gap-huge',
    giant: 'gap-giant',
};
// A column of fields that submits as one. Put a Button with `htmlType="submit"` inside it.
// The browser does not validate; the app shows its own errors.
export default function Form(_a) {
    var children = _a.children, onSubmit = _a.onSubmit, _b = _a.gap, gap = _b === void 0 ? 'large' : _b, ariaLabel = _a["aria-label"];
    return (<form noValidate aria-label={ariaLabel} className={"flex flex-col ".concat(gaps[gap])} onSubmit={function (event) {
            event.preventDefault();
            onSubmit();
        }}>
      {children}
    </form>);
}
