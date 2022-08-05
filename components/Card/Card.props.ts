import { DetailedHTMLProps, ReactNode, HTMLAttributes } from "react";

export const enum CardColor {
    white = 'white',
    blue = 'blue',
}

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color?: CardColor;
    children: ReactNode
}
