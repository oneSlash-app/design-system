interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}
export default function Checkbox({ label, checked, onChange, disabled }: CheckboxProps): import("react").JSX.Element;
export {};
