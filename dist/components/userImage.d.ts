import React from 'react';
interface UserImageProps {
    userHandle: string;
    userImgUrl?: string;
    grayscale?: boolean;
    /** Diameter in pixels. Defaults to 24. The initial scales with it. */
    size?: number;
    /** Passed to the `<img>`, e.g. `no-referrer` for hosts that refuse requests carrying a referrer */
    referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}
export default function UserImage({ userHandle, userImgUrl, grayscale, size, referrerPolicy, }: UserImageProps): React.JSX.Element;
export {};
