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

//Omit for avoiding conflicts with motion.button component
export interface ButtonProps extends
    Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
        'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
    children: ReactNode;
    appearance: ButtonAppearance;
    arrow?: ButtonArrow;
}
