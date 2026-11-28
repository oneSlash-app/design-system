import React from 'react';
interface LoadingSmallProps {
    size?: 'large' | 'medium' | 'small' | 'tiny';
}
interface LoadingScreenProps {
    /** One line of text centered under the spinner. It is also the status element's accessible name, in place of "Loading". */
    label?: string;
}
export default function LoadingScreen({ label }?: LoadingScreenProps): React.JSX.Element;
export declare function LoadingSmall({ size }: LoadingSmallProps): React.JSX.Element;
export {};
