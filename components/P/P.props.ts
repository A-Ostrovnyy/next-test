import { DetailedHTMLProps, ReactNode, HTMLAttributes } from "react";

export const enum PSize {
    small = 'small',
    medium = 'medium',
    large = 'large',
}

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    size?: PSize;
    children: ReactNode
}
