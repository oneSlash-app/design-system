import React from 'react';
interface UserImageProps {
    userHandle: string;
    userImgUrl?: string;
    grayscale?: boolean;
}
export default function UserImage({ userHandle, userImgUrl, grayscale, }: UserImageProps): React.JSX.Element;
export {};
