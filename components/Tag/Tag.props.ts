import { DetailedHTMLProps, ReactNode, HTMLAttributes } from "react";

export const enum TagSize {
    small = 'small',
    medium = 'medium',
}

export const enum TagColor {
    ghost = 'ghost',
    red = 'red',
    grey = 'grey',
    green = 'green',
    primary = 'primary',
}

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: TagSize;
    children: ReactNode;
    color?: TagColor;
    href?: string;
}
