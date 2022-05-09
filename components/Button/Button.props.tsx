import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export const enum ButtonAppearance {
    primary = 'primary',
    ghost = 'ghost',
}

export const enum ButtonArrow {
    right = 'right',
    down = 'down',
    none = 'none',
}

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
    appearance: ButtonAppearance;
    arrow?: ButtonArrow;
}
