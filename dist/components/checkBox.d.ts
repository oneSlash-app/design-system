interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}
export default function Checkbox({ label, checked, onChange }: CheckboxProps): import("react").JSX.Element;
export {};
